import { Component, OnInit } from '@angular/core';
import {AddressService} from "../services/address.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private service:AddressService) { }

  ngOnInit(): void {
  }

  routeList:any
  getAllUser(){
    let temp =  this.service.getAllRoute()
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


}
