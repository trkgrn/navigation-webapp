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
  first=0;
  totalVehicles:any;
  vehicleAddPageClick: boolean = true;
  vehicleListPageClick: boolean = false;

  vehicleList: Array<any> = [];
  vehicle: Vehicle = {driver: undefined, vehicleId: undefined, name: '', license: '', modelName: ''};

  constructor(public vehicleService: VehicleService, public dateService: DateService,
              public addressService: AddressService, private mapService: MapService,
              private messageService: MessageService) {
  }

 async ngOnInit() {
   let countVehicle:any = await  this.vehicleService.countVehicle().toPromise();
   this.totalVehicles = countVehicle;
  }

  vehicleAddPage() {
    this.vehicleAddPageClick = true;
    this.vehicleListPageClick = false;
  }

  async vehicleListPage() {
    this.vehicleAddPageClick = false;
    this.vehicleListPageClick = true;

    let countVehicle:any = await  this.vehicleService.countVehicle().toPromise();
    this.totalVehicles = countVehicle;
    let vehicleListByPage : any = await this.vehicleService.getAllVehicleByPage(0,10).toPromise();
    this.vehicleList = vehicleListByPage;
  }



  async add(form: NgForm) {
    let newCar: any = await this.vehicleService.addVehicle(this.vehicle).toPromise()
    let vehicles: any = await this.vehicleService.getAllVehicle().toPromise()
    console.log(vehicles)
    this.messageService.add({
      severity: 'success', summary: 'Araç eklendi!',
      detail: newCar.name + " adlı " + newCar.modelName + " modelindeki " + newCar.license + " plakalı araç eklendi!"
    });
  }

 async onPageChange(event:any){
    let pageNo = event.page;
    let pageSize = event.rows;
    let vehicleListByPage : any = await this.vehicleService.getAllVehicleByPage(pageNo,pageSize).toPromise()
    this.vehicleList = vehicleListByPage;
  }

}

export class Vehicle {
  vehicleId: any;
  name?: string;
  modelName?: string;
  license?: string;
  driver: any;
}
