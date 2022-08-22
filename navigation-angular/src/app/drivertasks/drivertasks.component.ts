import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {AddressService} from "../services/address.service";
import {VehicleService} from "../services/vehicle.service";
import {DateService} from "../services/date.service";
import {DriverService} from "../services/driver.service";
import {data} from "autoprefixer";
import {MapService} from "../services/map.service";
import {GoogleMap} from "@agm/core/services/google-maps-types";

@Component({
  selector: 'app-drivertasks',
  templateUrl: './drivertasks.component.html',
  styleUrls: ['./drivertasks.component.css']
})
export class DrivertasksComponent implements OnInit {

  constructor(private messageService:MessageService, private addressService:AddressService,
              private vehicleService:VehicleService, public  dateService:DateService,
              private driverService:DriverService, private  mapService:MapService) { }

  items: MenuItem[] = [];
  activeItem: MenuItem = this.items[0];
  routeMap!: GoogleMap;
  vehicleList: Array<any> = []
  routeList: Array<any> = []
  addressList:Array<any> = []
  markers:Array<any> = []
  selectedRoute:any;
  first = 0;
  totalRoutes = 0;

  displayVehicleListPage : boolean = true;
  displayRouteListPage : boolean = false;
  displayRouteMap: boolean = false;

 async ngOnInit() {
    this.items = [
      {label: 'Araçlarım', icon: 'pi pi-fw pi-car',command: (e) => {
         this.showVehicleListPage();
         this.displayVehicleListPage = true;
         this.displayRouteListPage = false;
        }},
      {label: 'Rotalarım', icon: 'pi pi-fw pi-map-marker',command: (e)=>{
        this.showRouteListPage();
        this.displayVehicleListPage = false;
        this.displayRouteListPage = true;
      }}
    ];

    this.activeItem = this.items[0];

    let temp:any = await this.driverService.findDriversOfVehiclesByUserId().toPromise();
    this.vehicleList = temp;

    let countRouteList:any = await this.addressService.countTasksByUserId().toPromise();
    this.totalRoutes = countRouteList;
  }

 async showVehicleListPage(){
    let temp : any = await this.driverService.findDriversOfVehiclesByUserId().toPromise()
    this.vehicleList = temp;
  }

 async showRouteListPage(){
   let temp:  any = await  this.addressService.findTasksByUserId(0,10).toPromise()
   this.routeList = temp;
  }

  async onPageChange(event:any){
    let pageNo = event.page;
    let pageSize = event.rows;
    let routeListByPage : any = await this.addressService.findTasksByUserId(pageNo,pageSize).toPromise();
    this.routeList = routeListByPage;
  }

  async showRouteMap(route: any) {
    this.selectedRoute = route;
    let list: any = await this.addressService.getAddressByRouteId(route.routeId).toPromise();
    this.addressList = list;
    this.displayRouteMap = true;
    this.markers = await this.mapService.drawDirection(route, this.routeMap, this.markers);
  }

  public onMapReady(event: GoogleMap) {
    this.routeMap = event;
  }

}
