import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AddressService} from "../services/address.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css','./address.component.scss']
})
export class AddressComponent implements OnInit {

  clonedAdres: { [s: string]: Adres } = {};

  warehouses:Array<any>=[];
  selectedOrigin:any;
  selectedDestination:any;
  selectedRouteDate?:Date;
  warehouseList:any;
  routeName:any;
  form:FormGroup;
  async ngOnInit() {
  let temp:any = await this.addressService.getAllWarehouse().toPromise()
  this.warehouses = temp
  }
  constructor(private addressService:AddressService,private fb:FormBuilder) {
    this.form = fb.group({
      routeName:[null , Validators.required],
      routeDate:[null, Validators.required],
      origin:[null, Validators.required],
      destination:[null, Validators.required]
    })
  }
  test(){
  //  console.log(this.selectedRouteDate)
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



  @Input() object: any ;
  @Output() msgEvent = new EventEmitter<any>();

  adres:Array<any> = [];

   newRoute(){
     let obj = {
       address : this.adres,
       origin : this.selectedOrigin,
       destination : this.selectedDestination,
       routeName : this.routeName,
       routeDate: this.selectedRouteDate
     }
    this.msgEvent.emit(obj)
  }

  onRowEditInit(adres: Adres) {
    this.clonedAdres[adres.addressId] = { ...adres };
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
  orderNo?:number;
  sehir: string;
  ilce: string;
  mahalle: string;
  sokak: string;
  binaNo: string;
  daireNo:string;
  route?:any;
  coordinate?:any;

}

export interface Route{
  routeId:number;
  routeDate:any;
  user:any;
  mapData:any;
  origin:any;
  destination:any;
  averageDistance:any;
  averageDuration:any;
}
