export class DateUtils {

  /* Candidate's comments:
  * As iexcloud.io doesn't support a chart API that returns data between two custom dates,
  * the dates entered by the user is converted to the nearest available time period and
  * data is fetched for that period. Filters can then be applied to filter the data out
  * for the desired time frame. For e.g. if the user requests for data between 1/1/2020
  * and 1/10/2020 (i.e. 10 days), data will be retrieved for 30 days which is the nearest
  * to 10 days and then filtered for data between the requested dates.
  *
  * The function is made static as the class doesn't hold state. Hence the class can be used
  * as a utility with the need of an instance to call the function.
  * */
  public static getRange(noOfDays: number): string[] {
    const timePeriods = [
      { period: '1d', min: 1, max: 1 }, // 1 day
      { period: '5d', min: 2, max: 5 }, // 5 days
      { period: '1m', min: 6, max: 30 }, // 1 month
      { period: '3m', min: 31, max: 90 }, // 3 months
      { period: '6m', min: 91, max: 180 }, // 6 months
      { period: '1y', min: 181, max: 365 }, // 1 year
      { period: '2y', min: 366, max: 730 }, // 2 years
      { period: '5y', min: 731, max: 1825 }, // 5 years
      { period: 'max', min: 1825, max: 5475 } // 15 years
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
