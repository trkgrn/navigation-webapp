import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivertasksComponent } from './drivertasks.component';

describe('DrivertasksComponent', () => {
  let component: DrivertasksComponent;
  let fixture: ComponentFixture<DrivertasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrivertasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivertasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
