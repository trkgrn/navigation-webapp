import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-drivertasks',
  templateUrl: './drivertasks.component.html',
  styleUrls: ['./drivertasks.component.css']
})
export class DrivertasksComponent implements OnInit {

  constructor() { }

  items: MenuItem[] = [];

  activeItem: MenuItem = this.items[0];

  ngOnInit() {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home',command: this.test},
      {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
      {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
      {label: 'Documentation', icon: 'pi pi-fw pi-file'},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];

    this.activeItem = this.items[0];
  }

  test(){
    console.log("deneme")
  }

}
