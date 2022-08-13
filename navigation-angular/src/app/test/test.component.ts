import { Component, OnInit } from '@angular/core';
import {AddressService} from "../services/address.service";
import {VehicleService} from "../services/vehicle.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private service:AddressService,private vehicleService:VehicleService) { }

  ngOnInit(): void {
  }

  routeList:any
  getAllUser(){
    let temp =  this.service.getAllRoute()
    temp.subscribe(data=>{this.routeList = data;
   // console.log(this.routeList)
    })
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

 async add(){
    let startDate = "2022-08-23 07:30:00"
    let endDate = "2022-08-25 07:30:00"
    let list:any = await this.vehicleService.getAvailableVehicles(startDate,endDate).toPromise();
    console.log(list)
  }


}
