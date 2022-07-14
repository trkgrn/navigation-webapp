import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {SelectItem} from "primeng/api";
import {MapComponent} from "../map/map.component";
import {AddressService} from "../services/address.service";
import {data} from "autoprefixer";


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  adres: Array<Adres> = [];
  clonedAdres: { [s: string]: Adres } = {};


  ngOnInit(): void {
  }
  constructor(private addressService:AddressService) {
  }

  isEmpty()
  {
    if (this.adres.length == 0)
      return true;

    return false
  }

  isNullofSehir(){
    let empty = ''
    for(var i=0; i<this.adres.length; i++){
      if ((this.adres[i].sehir == null || this.adres[i].sehir == empty))
        return true;
    }
    return false
  }



  @Input() waypoints: Array<any> = [];
  @Output() msgEvent = new EventEmitter<Array<any>>();

  async newRoute(){

    for (let i = 0; i < this.adres.length ; i++) {
      const obj = {location: this.adres[i].mahalle+' MAH '+ this.adres[i].sokak +' SK. No:'
          + this.adres[i].binaNo +
       ' ' + this.adres[i].ilce + '/' +this.adres[i].sehir}
      this.waypoints.push(obj)
    }
    this.msgEvent.emit(this.waypoints)

    const route:any = await this.addressService.addRoute().toPromise();
    this.adres.map(item => {
      item.route = {
        routeId: route.routeId
      }
    })

  const addressList = await this.addressService.addAddressList(this.adres).toPromise()

  }

  onRowEditInit(adres: Adres) {
    this.clonedAdres[adres.addressId] = { ...adres };
    console.log(localStorage.getItem("username"))
    console.log(localStorage.getItem("userId"))
  }

  onRowEditSave(car: Adres) {
    delete this.clonedAdres[car.addressId];
  }

  onRowEditCancel(adres: Adres, index: number) {
    this.adres[index] = this.clonedAdres[adres.addressId];
    delete this.clonedAdres[adres.addressId];
  }

  onRowDelete(address: Adres, index:number){
    this.adres.splice(index,1)
    delete this.clonedAdres[address.addressId]
  }

  newRow():Adres{
    for (let i = 0; i < this.adres.length; i++) {
      this.adres[i].addressId = i+1;
    }
    return {addressId:this.adres.length+1, sehir: "", ilce: "", mahalle: "", sokak: "", binaNo:"", daireNo:"" };
  }
}

export interface Adres {
  addressId: number;
  sehir: string;
  ilce: string;
  mahalle: string;
  sokak: string;
  binaNo: string;
  daireNo:string;
  route?:any

}

export interface Route{
  routeId:number;
  routeDate:any;
  user:any;
}
