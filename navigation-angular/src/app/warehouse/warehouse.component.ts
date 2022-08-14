import { Component, OnInit } from '@angular/core';
import {MapsAPILoader} from "@agm/core";
import {NgForm} from "@angular/forms";
import {Adres} from "../address/address.component";
import {Coordinate} from "../map/map.component";
import {AddressService} from "../services/address.service";
import {MessageService} from "primeng/api";
declare var google: any;
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  warehouseAddPageClick: boolean = true;
  warehouseListPageClick: boolean = false;
  geocoder: any;
  address: any;

  warehouse: Warehouse = {address: {addressId: 0}}
  model: Adres = {
    addressId: 0,
    binaNo: "",
    daireNo: "",
    ilce: "",
    mahalle: "",
    sehir: "",
    sokak: "",
    coordinate: {coordinateId: 0}
  }
  coordinate: Coordinate = {latitude: 0, longitude: 0}


  constructor(public mapsApiLoader: MapsAPILoader, private addressService: AddressService, private messageService: MessageService) {
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit(): void {
  }

  formatAddress() {
    const formattedAddress = this.model.mahalle + ' MAH ' + this.model.sokak + ' SK. No:'
      + this.model.binaNo +
      ' ' + this.model.ilce + '/' + this.model.sehir;
    this.address = formattedAddress;
  }

  async add(form: NgForm) {
    this.formatAddress()
    await this.findCoordinatesByAddress()

    let newCoordinate: any = await this.addressService.addCoordinate(this.coordinate).toPromise();
    this.model.coordinate.coordinateId = newCoordinate.coordinateId

    let newAddress: any = await this.addressService.addAddress(this.model).toPromise()
    this.warehouse.address.addressId = newAddress.addressId

    let newWarehouse: any = await this.addressService.addWarehouse(this.warehouse).toPromise()

  }


  async findCoordinatesByAddress() {
    await this.geocoder.geocode(
      {
        address: this.address
      },
      (results: any, status: any) => {
        results.forEach((result:any) => {
          let control = result.formatted_address.toUpperCase().includes(this.model.ilce.toUpperCase()+"/"+this.model.sehir.toUpperCase());
          if(control){
            this.coordinate.latitude = result.geometry.location.lat();
            this.coordinate.longitude = result.geometry.location.lng();
          }
        })
      }
    );
  }


  warehouseAddPage() {
    this.warehouseAddPageClick = true
    this.warehouseListPageClick = false;
  }

 async warehouseListPage() {
    this.warehouseListPageClick = true;
    this.warehouseAddPageClick = false;

    this.options = {
      center: {lat: 38.5561096, lng: 33.3898941},
      zoom: 6
    };

  await  this.initOverlays();

    this.infoWindow = new google.maps.InfoWindow();
  }

  options: any;

  overlays: any[] = [];


  markerTitle: string = "";

  selectedPosition: any;

  infoWindow: any;

  draggable: boolean = false;


  handleMapClick(event: any) {
    this.selectedPosition = event.latLng;
  }

  handleOverlayClick(event: any) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());

      this.messageService.add({severity: 'info', summary: 'Depo', detail: title});
    }
  }



  warehouseList:any[] = []
 async initOverlays() {
    let list:any = await this.addressService.getAllWarehouse().toPromise()
    this.warehouseList =list

    for (const next  of this.warehouseList) {
      let temp = new google.maps.Marker({
        position: {lat: next.address.coordinate.latitude, lng: next.address.coordinate.longitude},
        title: next.name
      })
      this.overlays.push(temp)
    }


  }
}
export class Warehouse{
  name?:string;
  address:any;
}
