import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartComponent } from './chart/chart.component';
import {MatFormFieldModule, MatInputModule} from "@angular/material";

@NgModule({
  imports: [CommonModule,
    GoogleChartsModule.forRoot(),
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [ChartComponent],
  exports: [ChartComponent]
})
export class SharedUiChartModule {}
