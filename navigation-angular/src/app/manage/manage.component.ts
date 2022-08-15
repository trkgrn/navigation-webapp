import { Component, OnInit } from '@angular/core';
import {VehicleService} from "../services/vehicle.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DriverService} from "../services/driver.service";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  form:FormGroup;
  displayDriverListPage:boolean = true;
  displayDriverAssignmentPage:boolean = false;
  displayDriverSelectDialog:boolean = false;
  vehicleList:Array<any> = [];
  driverTypes:Array<any> = [];
  selectedStartDate?:Date;
  selectedEndDate?:Date;
  rangeDates: Date[] = [];
  selectedVehicle:any;
  selectedType:any;

  constructor(private driverService:DriverService,private vehicleService:VehicleService,private fb:FormBuilder) {
    this.form = fb.group({
      range:[null , Validators.required],
      type:[null, Validators.required]
    })
  }

 async ngOnInit() {
    let temp:any = await this.driverService.getAllDriverType().toPromise();
    this.driverTypes = temp;
  }

  driverListPage(){
    this.displayDriverAssignmentPage = false;
    this.displayDriverListPage = true;
  }
 async driverAssignmentPage(){
    this.displayDriverAssignmentPage = true;
    this.displayDriverListPage = false;
    let temp:any = await this.vehicleService.getAllVehicle().toPromise();
    this.vehicleList = temp;
  }

  availableDrivers(vehicle:any){
    this.displayDriverSelectDialog = true;
    this.selectedVehicle = vehicle;
    console.log(this.vehicleList)
  }
  test() {
    this.selectedStartDate = this.rangeDates[0]
    this.selectedEndDate = this.rangeDates[1]
    console.log(this.selectedVehicle)
    if(this.selectedEndDate){
      this.selectedEndDate.setHours(23)
      this.selectedEndDate.setMinutes(59)
      this.selectedEndDate.setSeconds(59)
    }

    console.log(this.selectedStartDate)
    console.log(this.selectedEndDate)
  }



}
