import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vehicle} from "../vehicle/vehicle.component";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  rootURL: string = environment.rootUrl;

  constructor(private http: HttpClient, private accountService: AccountService) {
  }

  addVehicle(vehicle: Vehicle) {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + this.accountService.getToken()})
    return this.http.post<Vehicle>(this.rootURL + "addVehicle", vehicle, {headers});
  }

  getAllVehicle() {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + this.accountService.getToken()})
    return this.http.get(this.rootURL + "getAllVehicle", {headers});
  }

  getAvailableVehicles(startDate: any, endDate: any) {
    console.log(startDate)
    console.log(endDate)
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + this.accountService.getToken()})
    return this.http.get(this.rootURL + "getAvailableVehicles?startDate=" + startDate + "&endDate=" + endDate, {headers});
  }

  findNotAssignmentVehicles(startDate: any, endDate: any, typeId: any) {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + this.accountService.getToken()})
    return this.http.get(this.rootURL + "findAllNotAssignmentVehicle?startDate=" + startDate + "&endDate=" + endDate + "&typeId=" + typeId,
      {headers});
  }

  getAllVehicleByPage(pageNo:any, pageSize:any){
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + this.accountService.getToken()})
    return this.http.get(this.rootURL + "getAllVehicleByPage?pageNo="+pageNo+"&pageSize="+pageSize, {headers});
  }

  countVehicle(){
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + this.accountService.getToken()})
    return this.http.get(this.rootURL + "countVehicle", {headers});
  }
}
