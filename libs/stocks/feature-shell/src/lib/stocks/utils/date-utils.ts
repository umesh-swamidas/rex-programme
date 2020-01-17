export class DateUtils {

  public static getRange(noOfDays: number): string[] {
    const timePeriods = [
      { period: '1d', min: 1, max: 1 },
      { period: '5d', min: 2, max: 5 },
      { period: '1m', min: 6, max: 30 },
      { period: '3m', min: 31, max: 90 },
      { period: '6m', min: 91, max: 180 },
      { period: '1y', min: 181, max: 365 },
      { period: '2y', min: 366, max: 730 },
      { period: '5y', min: 731, max: 1825 },
      { period: 'max', min: 1825, max: 5475 }
    ];
    return timePeriods.
    filter(function (a) {
      return noOfDays >= a.min && noOfDays <= a.max;
    }).
    map(function (a) {
      return a.period;
    });
  }

}
