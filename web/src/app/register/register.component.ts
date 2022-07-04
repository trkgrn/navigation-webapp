import { Component, OnInit } from '@angular/core';
import {AccountService} from "../services/account.service";
import {User} from "../login/user";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

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


  ngOnInit(): void {
  }

  register(form:NgForm){
    console.log(this.model)
    this.accountService.register(this.model).subscribe(data=>{
      this.router.navigate(["/home"]);
      alert("Kayıt başarılı!")
    },error => alert("Kayıt başarısız!"))

  }


}
