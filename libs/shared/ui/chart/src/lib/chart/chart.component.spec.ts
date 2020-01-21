import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule} from "@angular/material";
import {SharedUiChartModule} from "@coding-challenge/shared/ui/chart";
import {GoogleChartsModule} from "angular-google-charts";

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        GoogleChartsModule
      ]
    })
    .compileComponents();
  }));

  // data$ has to be mocked/provided for this test case to work (the subscription fails otherwise)
  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
