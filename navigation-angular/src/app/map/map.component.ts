import {GoogleMap, LatLng, Polyline, PolylineOptions} from '@agm/core/services/google-maps-types';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {} from 'googlemaps'
import {AddressService} from "../services/address.service";
import {Adres} from "../address/address.component";
import {stringify} from 'zipson';
import {DateService} from "../services/date.service";
import {MapService} from "../services/map.service";
import {VehicleService} from "../services/vehicle.service";
import {MessageService} from "primeng/api";


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
  displayRouteMap: boolean = false;
  displayNotAssignmentRoutesTable : boolean = false;
  displayAvailableVehicleTable : boolean = false;

  adres: Array<Adres> = [];
  waypoint_order: Array<any> = [];
  coordinateList: Array<Coordinate> = [];
  routeName: any;
  routeStartDate?: Date;
  routeEndDate?: Date;
  selectedRoute: any;
  compressMapData: any;
  notAssignedRouteList:Array<any> = []
  availableVehicleList:Array<any> = []

  addressList: Array<any> = [];
  markers: Array<any> = [];
  routeList: Array<any> = []

  constructor(private addressService: AddressService, private vehicleService:VehicleService,
              public dateService:DateService, private messageService:MessageService,
              private mapService:MapService) {
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
    this.displayNotAssignmentRoutesTable = false;
    this.getAllRoute()
  }

  showDialog() {
    this.display = true;
    this.directionDisplay = false;
  }

 async showNotAssignmentRoutes(){
    this.displayRouteTable = false;
    this.displayMap = false;
    this.display = false;
    this.directionDisplay = false;
    this.rbClick = false;
    this.displayNotAssignmentRoutesTable = true;
    let temp: any = await this.addressService.getAllRouteByVehicleNull().toPromise()
    this.notAssignedRouteList = temp
  }

  showMap() {
    this.displayMap = true;
  }

  async showRouteMap(route: any) {
    this.selectedRoute = route;
    let list: any = await this.addressService.getAddressByRouteId(route.routeId).toPromise();
    this.addressList = list;
    this.displayRouteMap = true
    this.markers = await this.mapService.drawDirection(route,this.routeMap,this.markers);
  }

  async showRouteDetail(route: any) {
    this.displayRouteDetail = true;
    this.selectedRoute = route;
    let temp: any = await this.addressService.getAddressByRouteId(route.routeId).toPromise();
    this.addressList = temp;

  }

  async availableVehicles(route: any) {
    this.selectedRoute = route;
    let startDate = this.dateService.dateFormat(new Date(route.startDate));
    let endDate = this.dateService.dateFormat(new Date(route.endDate));
    let temp: any = await this.vehicleService.getAvailableVehicles(startDate, endDate).toPromise();
    this.availableVehicleList = temp;
    this.displayAvailableVehicleTable = true;
  }

  async selectVehicle(vehicle:any){
    console.log(vehicle)
    this.selectedRoute.vehicle = vehicle;
    console.log(this.selectedRoute)
    this.displayAvailableVehicleTable = false;
    let newRoute:any = await this.addressService.updateRoute(this.selectedRoute).toPromise()
    console.log(newRoute)
    let temp:any = await this.addressService.getAllRouteByVehicleNull().toPromise()
    this.routeList = temp
    this.messageService.add({severity: 'success', summary: 'Araç görevlendirildi!',
      detail: newRoute.name + " adlı rota " + newRoute.vehicle.license +" plakalı "
        +newRoute.vehicle.modelName +" modelinde araca görevlendirildi!"});
  }

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

    this.mapService.setDirection(this.map,event)

    const myRoute = event.routes[0];
    this.waypoint_order = myRoute.waypoint_order

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
