import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import {DatePipe} from "@angular/common";
import {DateUtils} from "./utils/date-utils";

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  quotes$ = this.priceQuery.priceQueries$;
  currentDate: Date = new Date();

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade, private datePipe: DatePipe) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  ngOnInit() {}

  public fetchQuote(): void {
    if (this.stockPickerForm.valid) {
      const { symbol, fromDate, toDate } = this.stockPickerForm.value;
      /* Candidate's comments:
       * The below code can be further simplified using third party libraries like moment.js which abstracts the below logic into ready made functions.
       * Here the period relative to the current date is calculated and sent to the public API
       */
      const from_date: string = this.datePipe.transform(fromDate, 'yyyy-MM-dd');
      const to_date: string = this.datePipe.transform(toDate, 'yyyy-MM-dd');
      const current_date: string = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      const diff: number = Math.floor((Date.parse(current_date.replace(/-/g, '\/')) -
        Date.parse(from_date.replace(/-/g, '\/'))) / 86400000);
      const period = DateUtils.getPeriodRelativeToCurrentDate(diff + 1).toString();
      this.priceQuery.fetchQuote(symbol, period, from_date, to_date);
    }
  }

}
