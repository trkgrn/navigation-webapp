import { Component } from '@angular/core';
import {AccountService} from "./services/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';
  constructor(private accountService:AccountService){}


  hasRoleManager(){
    if (this.accountService.getRole() == 'Manager')
      return true;
    return false;
  }

  hasRoleDriver(){
    if (this.accountService.getRole() == 'Driver')
      return true;
    return false;
  }


  isLoggedIn()
  {
    return this.accountService.isUserSignedin()
  }
  logOut()
  {
    this.accountService.signout()
  }
}
