import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../services/vehicle.service";
import {NgForm} from "@angular/forms";
import {DateService} from "../services/date.service";
import {AddressService} from "../services/address.service";
import {GoogleMap, LatLng, Polyline, PolylineOptions} from "@agm/core/services/google-maps-types";
import {MapService} from "../services/map.service";
import {MessageService} from "primeng/api";

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
  displayAvailableVehicleTable: boolean = false;

  // Route map
  public routeMap!: GoogleMap;
  markers: Array<any> = [];

  selectedRoute: any;
  addressList: Array<any> = [];
  routeList: Array<any> = [];
  vehicle: Vehicle = {driver: undefined, vehicleId: undefined, name: '', license: '', modelName: ''};
  availableVehicleList: Array<any> = [];

  constructor(public vehicleService: VehicleService, public dateService: DateService,
              public addressService: AddressService, private mapService: MapService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  vehicleAddPage() {
    this.vehicleAddPageClick = true;
    this.routeAssignmentPageClick = false;
    this.displayRouteTable = false;
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
    this.messageService.add({severity: 'success', summary: 'Araç eklendi!',
      detail: newCar.name +" adlı "+newCar.modelName +" modelindeki " +newCar.license +" plakalı araç eklendi!"});
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

  async availableVehicles(route: any) {
    this.selectedRoute = route;
    let startDate = this.dateService.dateFormat(new Date(route.startDate));
    let endDate = this.dateService.dateFormat(new Date(route.endDate));
    let temp: any = await this.vehicleService.getAvailableVehicles(startDate, endDate).toPromise();
    this.availableVehicleList = temp;
    this.displayAvailableVehicleTable = true;
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
