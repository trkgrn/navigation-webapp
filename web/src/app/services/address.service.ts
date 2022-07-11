import { Injectable } from '@angular/core';

export interface Book {
  name?:string;
  price?:string;
  author?:string;
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor() { }
}
