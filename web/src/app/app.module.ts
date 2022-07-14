import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import {AccountService} from "./services/account.service";
import { RegisterComponent } from './register/register.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { LoginGuard } from './login/login.guard';
import {AgmDirectionModule} from "agm-direction";
import {MapService} from "./services/map.service";
import {DialogModule} from "primeng/dialog";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {RippleModule} from "primeng/ripple";
import { AddressComponent } from './address/address.component';
import {DropdownModule} from "primeng/dropdown";
import {AddRowDirective} from "./address/add-row.directive";
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MapComponent,
    AddressComponent,
    AddRowDirective,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCsIa9zfb4YCEUjH4zwXZImftMgqpnrCzU'
    }),
    AgmDirectionModule,
    DialogModule,
    NoopAnimationsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToolbarModule,
    FileUploadModule,
    RippleModule,
    DropdownModule
  ],
  providers: [AccountService,LoginGuard,MapService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
