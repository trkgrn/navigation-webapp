import { Component, OnInit } from '@angular/core';
import {VehicleService} from "../services/vehicle.service";
import {NgForm} from "@angular/forms";
import {DateService} from "../services/date.service";
import {AddressService} from "../services/address.service";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicleAddPageClick:boolean = true;
  routeAssignmentPageClick:boolean = false;
  displayRouteTable:boolean = false;
  displayRouteDetail:boolean = false;
  displayRouteMap:boolean = false;

  selectedRoute: any;
  addressList: Array<any> = [];
  routeList:Array<any> = [];
  vehicle:Vehicle ={driver: undefined, vehicleId: undefined, name:'',license:'',modelName:''};

  constructor(public vehicleService:VehicleService,public dateService:DateService,public addressService:AddressService) { }

  ngOnInit(): void {
  }

  vehicleAddPage() {
    this.vehicleAddPageClick = true;
    this.routeAssignmentPageClick = false;
  }
  routeAssignmentPage(){
    this.vehicleAddPageClick = false;
    this.routeAssignmentPageClick = true;
    this.displayRouteTable = true;
  }

  showRouteMap(route:any){
    this.displayRouteMap = true;
  }

 async showRouteDetail(route:any){
    this.displayRouteDetail = true;
    this.selectedRoute = route;
    let list: any = await this.addressService.getAddressByRouteId(route.routeId).toPromise();
    this.addressList = list;
  }

 async add(form:NgForm){
  let newCar:any = await this.vehicleService.addVehicle(this.vehicle).toPromise()
   let vehicles:any = await this.vehicleService.getAllVehicle().toPromise()
  console.log(vehicles)
  }


}

export class Vehicle{
  vehicleId:any;
  name?:string;
  modelName?:string;
  license?:string;
  driver:any;
}
