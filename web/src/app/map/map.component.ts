import {GoogleMap, LatLng, Polyline, PolylineOptions} from '@agm/core/services/google-maps-types';
import {Component, OnInit} from '@angular/core';
import {} from 'googlemaps'
import {MapService} from "../services/map.service";
import {AddressService} from "../services/address.service";


declare var google: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css','./map.component.scss']
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

  public origin: any;
  public destination: any;
  isClick: boolean = false;

  constructor(private addressService: AddressService) {
  }

  ngOnInit(): void {
    this.setCurrentLocation()
    this.getAllRoute()
  }



  receiveValue($event:any):void{
    this.waypoints = $event;
   // this.isClick = true
    console.log(this.waypoints)
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.origin = {lat: this.latitude, lng: this.longitude}
        this.destination = {lat: this.latitude, lng: this.longitude}
      });
    }
  }


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

  rbClick:boolean = false;
  display: boolean = false;
  displayMap: boolean = false;
  displayRouteTable:boolean = true;

  rbActive() {
    this.rbClick = true;
  }

  showRoutes(){
    this.displayRouteTable = true
    this.displayMap = false
    this.display = false
    this.isClick = false
    this.rbClick = false
  }

  showDialog() {
    this.display = true;
    this.isClick = false;
  }

  showMap(){
    this.displayMap = true;
  }

  routeList:any
  getAllRoute(){
    let temp =  this.addressService.getAllRoute()
    temp.subscribe(data=>{this.routeList = data;
      console.log(this.routeList)})
  }

  calculateAddressTotal(routeId:number) {
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

  // Save GoogleMap instance
  public onMapReady(event: GoogleMap) {
    this.map = event;
  }

  public async onResponse(event: any) {
    // Default style
    const polylineOptions: PolylineOptions = {
      strokeWeight: 6,
      strokeOpacity: 0.55,
    };

    // Polylines strokeColor
    const colors = ['#0000FF', '#d40000', '#0000FF'];

    // Clear exist polylines
    this.polylines.forEach(polyline => polyline.setMap(this.map));

    const {legs} = event.routes[0];

    legs.forEach((leg: { steps: any[]; }, index: string | number) => {

      leg.steps.forEach(step => {
        const nextSegment = step.path;
        const stepPolyline: Polyline = new google.maps.Polyline(polylineOptions);

        // Custom color


        nextSegment.forEach((next: LatLng) => stepPolyline.getPath().push(next));

        this.polylines.push(stepPolyline);
        stepPolyline.setMap(this.map);
      });
    });
  }


}//class
