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

  errorMessage = 'Giriş başarısız.';
  successMessage:string | undefined;
  invalidLogin = false;
  loginSuccess = false;
  message: any
  model:User = new User();


  ngOnInit(): void {

  }

  login(form:NgForm)
  {
    console.log(this.model)
    this.accountService.login(this.model).subscribe(data=>{
      this.router.navigate(["/home"])
    },error => alert("Giriş başarısız!"));
  }

}
