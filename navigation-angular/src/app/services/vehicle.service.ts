import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vehicle} from "../vehicle/vehicle.component";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  rootURL:string = environment.rootUrl;
  constructor(private http:HttpClient,private accountService:AccountService) { }

  addVehicle(vehicle:Vehicle){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
    return this.http.post<Vehicle>( this.rootURL + "addVehicle",vehicle,{headers});
  }

  getAllVehicle(){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
    return  this.http.get(this.rootURL + "getAllVehicle",{headers});
  }
}
