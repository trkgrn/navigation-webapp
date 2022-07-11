import {GoogleMap, LatLng, Polyline, PolylineOptions} from '@agm/core/services/google-maps-types';
import {Component, OnInit} from '@angular/core';
import {} from 'googlemaps'
import {MapService} from "../services/map.service";


declare var google: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
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

  public origin: any = 'Ayazağa';
  public destination: any = 'Maslak';
  isClick: boolean = false;

  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {
    this.setCurrentLocation()
  }

  display: boolean = false;

  showDialog() {
    this.display = true;
    this.isClick = false;
  }

  receiveValue($event:any):void{
    this.waypoints = $event;
    this.isClick = true
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


  doubleClick(event: any) {
    console.log(event)

    const obj = {location: {lat: event.coords.lat, lng: event.coords.lng}}
    const obj2 = {lat: event.coords.lat, lng: event.coords.lng}

    this.waypoints.push(obj)
    this.locations.push(obj2)

    console.log(this.waypoints)
  }

  test() {
    this.isClick = true;
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
