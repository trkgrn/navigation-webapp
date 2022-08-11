import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "../services/account.service";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private accountService:AccountService, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let logged = this.accountService.isUserSignedin()
    if(logged)
    {
      const role = route.data['roles'] as Array<string>;
      if(role){
        const match = this.accountService.roleMatch(role);
        if (match) {
          return true;
        } else {
          this.router.navigate(["/home"]);
          return false;
        }
      }

    }
    this.router.navigate(["/login"]);
    return false;
  }
}
