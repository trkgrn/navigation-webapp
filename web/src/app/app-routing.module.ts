import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {MapComponent} from "./map/map.component";
import { LoginGuard } from './login/login.guard';
import {AddressComponent} from "./address/address.component";

const routes: Routes = [
  {path:"home",component:HomeComponent,canActivate:[LoginGuard]},
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"google-map",component:MapComponent},
  {path:"test",component:AddressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
