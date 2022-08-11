import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { User } from './user';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService:AccountService,private router:Router) { }

  errorMessage = 'Giriş başarısız!';
  successMessage = 'Giriş başarılı!';
  invalidLogin = false;
  loginSuccess = false;
  message: any
  model:User = new User();


  ngOnInit(): void {

  }

  login(form:NgForm)
  {
   // console.log(this.model)
    this.accountService.login(this.model).subscribe(data=>{
      if(this.accountService.getRole()==='Manager')
        this.router.navigate(["/home"])
      else if (this.accountService.getRole()==='Driver')
        this.router.navigate(["/test"]);
    },error => alert("Giriş başarısız!"));
  }

}
