import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AddressComponent, Adres, Route} from "../address/address.component";
import {AccountService} from "./account.service";
import {Coordinate} from "../map/map.component";
import {Warehouse} from "../warehouse/warehouse.component";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  rootURL: string = environment.rootUrl
  constructor(private http:HttpClient,private accountService:AccountService) { }

  addCoordinate(obj:any){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
    return this.http.post<Coordinate>(this.rootURL + "addCoordinate",obj,{headers})
  }

  addRoute(routeData:any){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
   // console.log(routeData)
    let route = {
      name: routeData.name,
      routeDate : routeData.routeDate,
      averageDistance:routeData.averageDistance,
      averageDuration:routeData.averageDuration,
      mapData:routeData.mapData,
      user:{
        id: sessionStorage.getItem("userId")
      },
      origin:{
        warehouseId: routeData.originId
      },
      destination:{
        warehouseId: routeData.destinationId
      }
    }
    return this.http.post<Route>(this.rootURL + "addRoute",route, {headers});
  }

  addAddressList(addressList:Adres[]){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
    return this.http.post<Adres[]>( this.rootURL + "addAddressList",addressList,{headers});
  }

  addAddress(address:Adres){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
    return this.http.post<Adres>( this.rootURL + "addAddress",address,{headers});
  }

  addWarehouse(warehouse:Warehouse){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
    return this.http.post<Warehouse>( this.rootURL + "addWarehouse",warehouse,{headers});
  }

  getAllRoute(){
    let userId = sessionStorage.getItem("userId")
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
    return  this.http.get(this.rootURL + "getUserRoutes?userId="+userId,{headers});
  }

  getAllRouteByUserId(){
    let userId = sessionStorage.getItem("userId")
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
    return  this.http.get(this.rootURL + "getAllRouteByUserId?id="+userId,{headers});
  }

  getAddressByRouteId(routeId:any){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
    return  this.http.get(this.rootURL + "getAddressByRouteId?routeId="+routeId,{headers});
  }


  getAllWarehouse(){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
    return  this.http.get(this.rootURL + "getAllWarehouse",{headers});
  }

  getMapDataByRouteId(routeId:any){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accountService.getToken()})
    return  this.http.get(this.rootURL + "getMapDataByRouteId?routeId="+routeId,{headers});
  }


}