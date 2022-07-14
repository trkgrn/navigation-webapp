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
    this.userProfile()
  }

  getAllUser(){
   let temp =  this.accountService.getAllUser()
    temp.subscribe(data=>this.userList = data)
  }


  tempUser: any
  userProfile(){
    let name = localStorage.getItem("isLogged")
    let temp = this.accountService.getUser(name!)
    temp.subscribe(data=> {
      if(data!=undefined){
        this.tempUser = data
         localStorage.setItem("userId",this.tempUser.id)
         localStorage.setItem("username",this.tempUser.username)
      }
    })

  }


}
