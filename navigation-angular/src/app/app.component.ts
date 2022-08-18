import {Component, OnInit} from '@angular/core';
import {AccountService} from "./services/account.service";
import {PrimeNGConfig} from "primeng/api";
import {DateService} from "./services/date.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web';

  constructor(private primengConfig: PrimeNGConfig, private accountService: AccountService,
              private dateService: DateService) {
  }

  ngOnInit() {
    this.primengConfig.setTranslation(this.dateService.LOCALE_TR);
  }

  hasRoleManager() {
    if (this.accountService.getRole() == 'Manager')
      return true;
    return false;
  }

  hasRoleDriver() {
    if (this.accountService.getRole() == 'Driver')
      return true;
    return false;
  }


  isLoggedIn() {
    return this.accountService.isUserSignedin()
  }

  logOut() {
    this.accountService.signout()
  }
}
