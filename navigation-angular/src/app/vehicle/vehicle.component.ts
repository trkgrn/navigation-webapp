import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../services/vehicle.service";
import {NgForm} from "@angular/forms";
import {DateService} from "../services/date.service";
import {AddressService} from "../services/address.service";
import {GoogleMap, LatLng, Polyline, PolylineOptions} from "@agm/core/services/google-maps-types";
import {MapService} from "../services/map.service";

declare var google: any;


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicleAddPageClick: boolean = true;
  routeAssignmentPageClick: boolean = false;
  displayRouteTable: boolean = false;
  displayRouteDetail: boolean = false;
  displayRouteMap: boolean = false;

  // Route map
  public routeMap!: GoogleMap;
  markers: Array<any> = [];

  selectedRoute: any;
  addressList: Array<any> = [];
  routeList: Array<any> = [];
  vehicle: Vehicle = {driver: undefined, vehicleId: undefined, name: '', license: '', modelName: ''};
  vehicleList: Array<any> = [];

  constructor(public vehicleService: VehicleService, public dateService: DateService,
              public addressService: AddressService, private mapService: MapService) {
  }

  ngOnInit(): void {
  }

  vehicleAddPage() {
    this.vehicleAddPageClick = true;
    this.routeAssignmentPageClick = false;
  }

  async routeAssignmentPage() {
    this.vehicleAddPageClick = false;
    this.routeAssignmentPageClick = true;
    this.displayRouteTable = true;

    let temp: any = await this.addressService.getAllRouteByVehicleNull().toPromise()
    this.routeList = temp
  }

  showRouteMap(route: any) {
    this.displayRouteMap = true;
  }

  async showRouteDetail(route: any) {
    this.displayRouteDetail = true;
    this.selectedRoute = route;
    let list: any = await this.addressService.getAddressByRouteId(route.routeId).toPromise();
    this.addressList = list;
  }

  async add(form: NgForm) {
    let newCar: any = await this.vehicleService.addVehicle(this.vehicle).toPromise()
    let vehicles: any = await this.vehicleService.getAllVehicle().toPromise()
    console.log(vehicles)
  }

  async availableVehicles(start: any, end: any) {
    let startDate = this.dateService.dateFormat(new Date(start));
    let endDate = this.dateService.dateFormat(new Date(end));
    let temp: any = await this.vehicleService.getAvailableVehicles(startDate, endDate).toPromise()
    console.log(temp)
  }

  public onMapReady(event: GoogleMap) {
    this.routeMap = event;
  }

  async showMap(route: any) {
    this.markers = await this.mapService.drawDirection(route, this.routeMap, this.markers)
    this.displayRouteMap = true
  }

}

export class Vehicle {
  vehicleId: any;
  name?: string;
  modelName?: string;
  license?: string;
  driver: any;
}
