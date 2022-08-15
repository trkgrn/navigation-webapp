import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AccountService} from "./account.service";

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
}
