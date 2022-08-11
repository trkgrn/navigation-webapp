import { Component, OnInit } from '@angular/core';
import {AccountService} from "../services/account.service";
import {User} from "../login/user";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {data} from "autoprefixer";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService:AccountService, private router:Router) { }

  model:User = new User();
  pass2:string | undefined
  empty:string = ''
  roles:Array<any> = [];


  ngOnInit(): void {
    this.model.role = {roleId:undefined};

    let temp = this.accountService.getAllRoles()

    temp.subscribe((data:any)=>{this.roles = data})

  }

  test(){
    console.log(this.model.role.roleId)
  }

  register(form:NgForm){
    this.accountService.register(this.model).subscribe(data=>{
      this.router.navigate(["/home"]);
      alert("Kayıt başarılı!")
    },error => alert("Kayıt başarısız!"))

  }


}
