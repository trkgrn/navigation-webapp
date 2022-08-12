import { Component, OnInit } from '@angular/core';
import {VehicleService} from "../services/vehicle.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicleAddPageClick:boolean = true;
  vehicleListPageClick:boolean = false;
  vehicle:Vehicle ={driver: undefined, vehicleId: undefined, name:'',license:'',modelName:''};

  constructor(private vehicleService:VehicleService) { }

  ngOnInit(): void {
  }

  vehicleAddPage() {
    this.vehicleAddPageClick = true;
    this.vehicleListPageClick = false;
  }
  vehicleListPage(){
    this.vehicleAddPageClick = false;
    this.vehicleListPageClick = true;
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
