import {GoogleMap, LatLng, Polyline, PolylineOptions} from '@agm/core/services/google-maps-types';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {} from 'googlemaps'
import {AddressService} from "../services/address.service";
import {Adres} from "../address/address.component";
import {stringify} from 'zipson';
import {parse} from "zipson/lib";
import {DateService} from "../services/date.service";


declare var google: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', './map.component.scss']
})
export class MapComponent implements OnInit {
  public title = 'playground';
  latitude: number = 40.99246515999449;
  longitude: number = 29.4352343256;

  public waypoints: Array<any> = [];
  locations: Array<any> = [];

  icon: any = {
    url: './assets/imgs/truck_pin.svg',
    scaledSize: {width: 50, height: 100}
  };

  public originLatlng: any;
  originData: any;
  public destinationLatlng: any;
  destinationData: any;
  avgDuration: any;
  avgDistance: any;

  directionDisplay: boolean = false;
  rbClick: boolean = false;
  display: boolean = false;
  displayMap: boolean = false;
  displayRouteTable: boolean = true;
  displayRouteDetail: boolean = false;

  adres: Array<Adres> = [];
  waypoint_order: Array<any> = [];
  coordinateList: Array<Coordinate> = [];
  routeName: any;
  routeStartDate?: Date;
  routeEndDate?: Date;
  selectedRoute: any;
  compressMapData: any;


  constructor(private addressService: AddressService,public dateService:DateService) {
  }

  ngOnInit(): void {
    //this.setCurrentLocation()
    this.getAllRoute()
  }

  waypointFormat() {
    let originObj = {
      lat: this.originData.address.coordinate.latitude,
      lng: this.originData.address.coordinate.longitude
    }
    let destinationObj = {
      lat: this.destinationData.address.coordinate.latitude,
      lng: this.destinationData.address.coordinate.longitude
    }
    this.originLatlng = originObj
    this.destinationLatlng = destinationObj
    for (let i = 0; i < this.adres.length; i++) {
      const obj = {
        location: this.adres[i].mahalle + ' MAH ' + this.adres[i].sokak + ' SK. No:'
          + this.adres[i].binaNo +
          ' ' + this.adres[i].ilce + '/' + this.adres[i].sehir
      }
      this.waypoints.push(obj)
    }
  }



  async createRoute() {
    this.routeEndDate = this.dateService.calculateEndDate(this.routeStartDate,this.avgDuration);
    let obj = {
      originId: this.originData.warehouseId,
      destinationId: this.destinationData.warehouseId,
      name: this.routeName,
      averageDistance: this.avgDistance,
      averageDuration: this.avgDuration,
      mapData: this.compressMapData,
      startDate: this.routeStartDate,
      endDate: this.routeEndDate
    }
    const route: any = await this.addressService.addRoute(obj).toPromise();
    this.adres.map(item => {
      item.addressId = 0,
        item.route = {
          routeId: route.routeId
        },
        item.coordinate = {
          coordinateId: 0
        },
        item.orderNo = 0

    })

    for (let i = 0; i < this.adres.length; i++) {
      let temp = this.waypoint_order[i]
      const addedCoordinate: any = await this.addressService.addCoordinate(this.coordinateList[i + 1]).toPromise()
      this.adres[temp].coordinate.coordinateId = addedCoordinate.coordinateId
      this.adres[temp].orderNo = i + 1;
    }


    const addressList = await this.addressService.addAddressList(this.adres).toPromise()

  }


  async receiveValue($event: any) {
    this.adres = $event.address;
    this.originData = $event.origin;
    this.destinationData = $event.destination;
    this.routeName = $event.routeName;
    this.routeStartDate = $event.startDate;
    this.waypointFormat()
    this.directionDisplay = true
    this.showMap()
  }

  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //
  //       this.origin = {lat: this.latitude, lng: this.longitude}
  //       this.destination = {lat: this.latitude, lng: this.longitude}
  //     });
  //   }
  // }


  // doubleClick(event: any) {
  //   console.log(event)
  //
  //   const obj = {location: {lat: event.coords.lat, lng: event.coords.lng}}
  //   const obj2 = {lat: event.coords.lat, lng: event.coords.lng}
  //
  //   this.waypoints.push(obj)
  //   this.locations.push(obj2)
  //
  //   console.log(this.waypoints)
  // }


  rbActive() {
    this.rbClick = true;
    this.displayRouteTable = false;
  }

  showRoutes() {
    this.displayRouteTable = true
    this.displayMap = false
    this.display = false
    this.directionDisplay = false
    this.rbClick = false
    this.getAllRoute()
  }

  showDialog() {
    this.display = true;
    this.directionDisplay = false;
  }

  showMap() {
    this.displayMap = true;
  }

  addressList: Array<any> = [];
  template: Array<any> = [];
  markers: Array<any> = [];
  displayRouteMap: boolean = false
  options: any;

  setMapOnAll(map: GoogleMap | null) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  deleteMarkers(): void {
    this.setMapOnAll(null);
    this.markers = [];
  }

  tempMapData: any

  async showRouteMap(route: any) {

    this.deleteMarkers()

    this.options = {
      center: {lat: 38.5561096, lng: 33.3898941},
      zoom: 6
    };

    try {
      let response: any = await this.addressService.getMapDataByRouteId(route.routeId).toPromise();
      //  console.log(response)
      route.mapData = response.mapData
    } catch (e) {
      //   console.log("ERROOOORRR"+e);
    }
    this.displayRouteMap = true
    let event = parse(route.mapData)
    //  console.log(event)

    const {legs} = event.routes[0];
    const myRoute = event.routes[0];

    let list: any = await this.addressService.getAddressByRouteId(route.routeId).toPromise();
    let labelIndex = 1

    let originMarker = new google.maps.Marker({
      position: {lat: route.origin.address.coordinate.latitude, lng: route.origin.address.coordinate.longitude},
      label: (labelIndex++) + ''
    })
    this.markers.push(originMarker)

    for (const next of list) {
      let marker = new google.maps.Marker({
        position: {lat: next.coordinate.latitude, lng: next.coordinate.longitude},
        label: (labelIndex++) + ''
      })
      this.markers.push(marker);

    }

    let destinationMarker = new google.maps.Marker({
      position: {
        lat: route.destination.address.coordinate.latitude,
        lng: route.destination.address.coordinate.longitude
      },
      label: (labelIndex++) + ''
    })
    this.markers.push(destinationMarker);

    this.setMapOnAll(this.routeMap);

    const polylineOptions: PolylineOptions = {
      strokeWeight: 6,
      strokeOpacity: 0.55,
      strokeColor: "#FF0000"
    };

    const colors = ['#0000FF', '#d40000', '#0000FF'];

    this.polylines.forEach(polyline => polyline.setMap(null!));


    legs.forEach((leg: { steps: any[]; }, index: string | number) => {

      leg.steps.forEach(step => {
        let nextSegment = google.maps.geometry.encoding.decodePath(step.polyline.points);
        const stepPolyline: Polyline = new google.maps.Polyline(polylineOptions);

        nextSegment.forEach((next: LatLng) => stepPolyline.getPath().push(next));

        this.polylines.push(stepPolyline);
        stepPolyline.setMap(this.routeMap);
      });
    });


  }

  async showRouteDetail(route: any) {
    this.displayRouteDetail = true;
    this.selectedRoute = route;
    let temp: any = await this.addressService.getAddressByRouteId(route.routeId).toPromise();
    this.addressList = temp;
    let obj = {data: temp};
    this.template.push(obj)

  }

  routeList: Array<any> = []

  getAllRoute() {
    let temp = this.addressService.getAllRoutes()
    temp.subscribe((data: any) => {
      this.routeList = data;
    })
  }

  calculateAddressTotal(routeId: number) {
    let total = 0;

    if (this.routeList) {
      for (let route of this.routeList) {
        if (route.route.routeId === routeId) {
          total++;
        }
      }
    }

    return total;
  }

  // Hide origin polylines
  public renderOptions = {suppressPolylines: true};

  // Custom polylines
  public polylines: Array<Polyline> = [];

  // Current map
  public map!: GoogleMap;

  // Route map
  public routeMap!: GoogleMap;

  // Save GoogleMap instance
  public onMapReady(event: GoogleMap) {
    this.map = event;
  }

  public onMapReady2(event: GoogleMap) {
    this.routeMap = event;
  }

  control: boolean = false;

  public async onResponse(event: any) {


    // Default style
    const polylineOptions: PolylineOptions = {
      strokeWeight: 6,
      strokeOpacity: 0.55,
      strokeColor: "#FF0000"
    };

    // Polylines strokeColor
    const colors = ['#0000FF', '#d40000', '#0000FF'];

    // Clear exist polylines
    this.polylines.forEach(polyline => polyline.setMap(null!));

    const {legs} = event.routes[0];
    const myRoute = event.routes[0];
    this.waypoint_order = myRoute.waypoint_order


    legs.forEach((leg: { steps: any[]; }, index: string | number) => {

      leg.steps.forEach(step => {
        const nextSegment = step.path;
        //   console.log("PATH: "+ step.path)
        const stepPolyline: Polyline = new google.maps.Polyline(polylineOptions);

        // Custom color


        nextSegment.forEach((next: LatLng) => stepPolyline.getPath().push(next));

        this.polylines.push(stepPolyline);
        stepPolyline.setMap(this.map);
      });
    });


    if (this.control) {

      this.control = false
      this.computeTotalDistanceAndDuration(event)
      this.pushCoordinateList(event)
      this.compressMapData = stringify(event);
      //   console.log(JSON.stringify(event))
      //   console.log(this.compressMapData)
      await this.createRoute()

    } else {
      this.control = true
    }

    /////
  }

  pushCoordinateList(result: google.maps.DirectionsResult) {
    const myRoute = result.routes[0];

    const obj = {
      longitude: myRoute.legs[0].start_location.lng(),
      latitude: myRoute.legs[0].start_location.lat()
    }
    this.coordinateList.push(obj)
    for (let i = 0; i < myRoute.legs.length; i++) {
      const object = {
        longitude: myRoute.legs[i].end_location.lng(),
        latitude: myRoute.legs[i].end_location.lat()
      }
      this.coordinateList.push(object)
    }


  }

  computeTotalDistanceAndDuration(result: google.maps.DirectionsResult) {
    let totalDistance = 0;
    let totalDuration = 0;
    const myroute = result.routes[0];

    if (!myroute) {
      return;
    }

    for (let i = 0; i < myroute.legs.length; i++) {
      totalDistance += myroute.legs[i]!.distance!.value;
      totalDuration += myroute.legs[i]!.duration!.value;
    }
    this.avgDistance = totalDistance;
    this.avgDuration = totalDuration;
    totalDistance = totalDistance / 1000;
    (document.getElementById("total") as HTMLElement).innerHTML = totalDistance + " km";
  }


}//class

export interface Coordinate {
  latitude: number,
  longitude: number
}
