import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {SelectItem} from "primeng/api";
import {MapComponent} from "../map/map.component";


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  adres: Array<Adres> = [];
  clonedAdres: { [s: string]: Adres } = {};

  constructor() {
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

  ngOnInit(): void {
  }

  @Input() waypoints: Array<any> = [];
  @Output() msgEvent = new EventEmitter<Array<any>>();

  newRoute(){
    console.log(this.adres)

    for (let i = 0; i < this.adres.length ; i++) {
      const obj = {location: this.adres[i].mahalle+' MAH '+ this.adres[i].sokak +' SK. No:'
          + this.adres[i].binano +
       ' ' + this.adres[i].ilce + '/' +this.adres[i].sehir}
      this.waypoints.push(obj)
    }
    this.msgEvent.emit(this.waypoints)

    console.log(this.waypoints)
  }

  onRowEditInit(adres: Adres) {
    this.clonedAdres[adres.no] = { ...adres };
  }

  onRowEditSave(car: Adres) {
    delete this.clonedAdres[car.no];
  }

  onRowEditCancel(adres: Adres, index: number) {
    this.adres[index] = this.clonedAdres[adres.no];
    delete this.clonedAdres[adres.no];
  }

  onRowDelete(address: Adres, index:number){
    this.adres.splice(index,1)
    delete this.clonedAdres[address.no]
  }

  newRow():Adres{
    for (let i = 0; i < this.adres.length; i++) {
      this.adres[i].no = i+1;
    }
    return {no:this.adres.length+1, sehir: "", ilce: "", mahalle: "", sokak: "", binano:"", daireno:"" };
  }
}

export interface Adres {
  no: number;
  sehir: string;
  ilce: string;
  mahalle: string;
  sokak: string;
  binano: string;
  daireno:string;

}
