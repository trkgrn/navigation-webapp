import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {MapComponent} from "./map/map.component";
import { LoginGuard } from './login/login.guard';
import {AddressComponent} from "./address/address.component";
import {TestComponent} from "./test/test.component";
import {WarehouseComponent} from "./warehouse/warehouse.component";
import {VehicleComponent} from "./vehicle/vehicle.component";

const routes: Routes = [
  {path:"home",component:HomeComponent,canActivate:[LoginGuard],data:{roles:['Manager','Driver']}},
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"google-map",component:MapComponent,canActivate:[LoginGuard],data:{roles:['Manager']}},
  {path:"add-address",component:AddressComponent,canActivate:[LoginGuard]},
  {path:"test",component:TestComponent,canActivate:[LoginGuard],data:{roles:['Manager','Driver']}},
  {path:"warehouse",component:WarehouseComponent,canActivate:[LoginGuard],data:{roles:['Manager']}},
  {path:"vehicle",component:VehicleComponent,canActivate:[LoginGuard],data:{roles:['Manager']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
