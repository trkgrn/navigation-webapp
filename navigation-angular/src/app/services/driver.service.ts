import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AccountService} from "./account.service";
import {Vehicle} from "../vehicle/vehicle.component";

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  rootURL:string = environment.rootUrl;
  constructor(private http:HttpClient,private accountService:AccountService) { }

  getAllDriverType(){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
    return  this.http.get(this.rootURL + "getAllDriverType",{headers});
  }

  getAvailableDrivers(startDate:any,endDate:any){
    console.log(startDate)
    console.log(endDate)
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
    return  this.http.get(this.rootURL + "getAvailableDrivers?startDate="+startDate+"&endDate="+endDate,{headers});
  }

  addDriverOfVehicle(driverOfVehicle:any){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
    return this.http.post<any>( this.rootURL + "addDriverOfVehicle",driverOfVehicle,{headers});
  }
}
