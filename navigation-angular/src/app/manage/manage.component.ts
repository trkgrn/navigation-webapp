import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../services/vehicle.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DriverService} from "../services/driver.service";
import {DateService} from "../services/date.service";
import {MessageService, PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  form: FormGroup;
  displayDriverListPage: boolean = true;
  displayDriverAssignmentPage: boolean = false;
  displayDriverSelectDialog: boolean = false;
  vehicleList: Array<any> = [];
  driverTypes: Array<any> = [];
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  rangeDates: Date[] = [];
  selectedVehicle: any;
  selectedType: any;
  availableDriverList: Array<any> = [];
  currentDate: Date = new Date();


  constructor(private driverService: DriverService, private vehicleService: VehicleService,
              private fb: FormBuilder, public dateService: DateService, private messageService: MessageService) {
    this.form = fb.group({
      range: [null, Validators.required],
      type: [null, Validators.required]
    })
  }

  async ngOnInit() {
    let temp: any = await this.driverService.getAllDriverType().toPromise();
    this.driverTypes = temp;
  }

  driverListPage() {
    this.displayDriverAssignmentPage = false;
    this.displayDriverListPage = true;
  }

  async driverAssignmentPage() {
    this.displayDriverAssignmentPage = true;
    this.displayDriverListPage = false;
    this.vehicleList = []
    this.availableDriverList = []
  }


  async findNotAssignmentVehicles() {
    this.selectedStartDate = this.rangeDates[0]
    this.selectedEndDate = this.rangeDates[1]

    if (this.selectedEndDate) {
      this.selectedEndDate.setHours(23)
      this.selectedEndDate.setMinutes(59)
      this.selectedEndDate.setSeconds(59)
    }
    let startDate = this.dateService.dateFormat(new Date(this.selectedStartDate));
    let endDate = this.dateService.dateFormat(new Date(this.selectedEndDate));
    let typeId = this.selectedType.typeId;
    let temp: any = await this.vehicleService.findNotAssignmentVehicles(startDate, endDate, typeId).toPromise();
    this.vehicleList = temp;

  }

  async findAvailableDrivers(vehicle: any) {
    this.displayDriverSelectDialog = true;
    this.selectedVehicle = vehicle;

    let startDate = this.dateService.dateFormat(new Date(this.selectedStartDate!));
    let endDate = this.dateService.dateFormat(new Date(this.selectedEndDate!));
    let temp: any = await this.driverService.getAvailableDrivers(startDate, endDate).toPromise();
    this.availableDriverList = temp;

  }

  async driverAssigned(driver: any) {
    console.log(driver)
    let obj = {
      driver: driver,
      vehicle: this.selectedVehicle,
      type: this.selectedType,
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate
    }
    let temp: any = await this.driverService.addDriverOfVehicle(obj).toPromise()
    console.log(temp)
    this.displayDriverSelectDialog = false;
    this.messageService.add({
      severity: 'success', summary: 'Şoför görevlendirildi!',
      detail: this.selectedVehicle.name + " adlı  " + this.selectedVehicle.license + " plakalı "
        + this.selectedVehicle.modelName + " modelindeki araç " + driver.user.username + " adlı şoföre " +
        this.dateService.dateFormatForHTML(this.selectedStartDate) + " ile " +
        this.dateService.dateFormatForHTML(this.selectedEndDate) + " tarihleri arasında " + this.selectedType.name +
        " olarak görevlendirildi!"
    });
  }


}
