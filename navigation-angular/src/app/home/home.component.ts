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
    let name = this.accountService.getSignedinUser()

    let temp = this.accountService.getUser(name!)
    temp.subscribe(data=> {
      if(data!=undefined){
        this.tempUser = data
         sessionStorage.setItem("userId",this.tempUser.id)
      }
    })

  }


}
