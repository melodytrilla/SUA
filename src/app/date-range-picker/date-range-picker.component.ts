import { ChangeDetectorRef, Component } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SatCalendar, SatCalendarFooter, SatDatepicker } from 'saturn-datepicker';
import { DateAdapter } from 'saturn-datepicker';

@Component({
  selector: 'DateRangePicker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.sass']
})
export class DateRangePicker<Date> implements SatCalendarFooter<Date> {

  public ranges: Array<{key: string, label: string}> = [
    {key: 'today', label: 'Hoy'},
    {key: 'thisWeek', label: 'Semana'},
    {key: 'thisMonth', label: 'Mes'},
  ];
  private destroyed = new Subject<void>();

  constructor(
    private calendar: SatCalendar<Date>,
    private datePicker: SatDatepicker<Date>,
    private dateAdapter: DateAdapter<Date>,
    cdr: ChangeDetectorRef
  ) {
    calendar.stateChanges
        .pipe(takeUntil(this.destroyed))
        .subscribe(() => cdr.markForCheck())
  }

  // si uno apreta los botones hoy, esta semana, este mes esta funcion se 
  // encarga de devolver el valor que debe ser
  setRange(range: string) {
    const today = moment();
    switch (range) {
        case 'today':
            this.calendar.beginDate = this.dateAdapter.deserialize(new Date());
            this.calendar.endDate = this.dateAdapter.deserialize(new Date());
            this.calendar.activeDate = this.calendar.beginDate;
            break;
        case 'thisWeek':
            this.calendar.beginDate = this.dateAdapter.deserialize(today.weekday(0).toDate());
            this.calendar.endDate = this.dateAdapter.deserialize(today.weekday(6).toDate());
            break;
        case 'thisMonth':
            this.calendar.beginDate = this.dateAdapter.deserialize(today.startOf('month').toDate());
            this.calendar.endDate = this.dateAdapter.deserialize(today.endOf('month').toDate());
            break;
    }
    this.calendar.activeDate = this.calendar.beginDate;
    this.calendar.beginDateSelectedChange.emit(this.calendar.beginDate);
    this.calendar.dateRangesChange.emit({begin: this.calendar.beginDate, end: this.calendar.endDate});
  }

}
