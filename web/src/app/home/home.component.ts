import { Component, OnInit } from '@angular/core';
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private accountService:AccountService) { }

  userList:any
  ngOnInit(): void {
  }

  getAllUser(){
   let temp =  this.accountService.getAllUser()
    temp.subscribe(data=>this.userList = data)
  }



}
