import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AddressComponent, Adres, Route} from "../address/address.component";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http:HttpClient) { }

  addRoute(){
    let username = 'user'
    let password = '321'
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    let route = {
      routeDate : new Date(),
      user:{
        id: localStorage.getItem("userId")
      }
    }
    return this.http.post<Route>("http://localhost:8080/addRoute",route, {headers});
  }

  addAddressList(addressList:Adres[]){
    let username = 'user'
    let password = '321'
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.post<Adres[]>("http://localhost:8080/addAddressList",addressList,{headers});
  }

  getAllRoute(){
    let username = 'user'
    let password = '321'
    let userId = localStorage.getItem("userId")
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return  this.http.get("http://localhost:8080/getUserRoutes?userId="+userId,{headers});
  }


}
