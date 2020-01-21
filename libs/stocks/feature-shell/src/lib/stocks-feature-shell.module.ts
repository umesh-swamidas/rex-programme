import {CommonModule, DatePipe} from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { StocksComponent } from './stocks/stocks.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: StocksComponent}
    ]),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    SharedUiChartModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  providers: [DatePipe],
  declarations: [StocksComponent]
})
export class StocksFeatureShellModule {}
