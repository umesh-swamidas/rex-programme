import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input, OnDestroy,
  OnInit
} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {

  @Input() data$: Observable<any>;
  chartData: any;
  private dataSubscription: Subscription;

  chart: {
    title: string;
    type: string;
    data: any;
    columnNames: string[];
    options: any;
  };
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.chart = {
      title: '',
      type: 'LineChart',
      data: [],
      columnNames: ['period', 'close'],
      options: { title: `Stock price`, width: '600', height: '400' }
    };

    this.dataSubscription = this.data$.subscribe(newData => (this.chartData = newData));
  }

  // The subscription in line 39 has to be unsubscribed upon the component's destruction.
  ngOnDestroy(){
    this.dataSubscription.unsubscribe();
  }
}
