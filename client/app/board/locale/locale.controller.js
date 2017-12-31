'use strict';

export default class LocaleController {
  dt = '';
  options = {
    showWeeks: false,
    startingDay: 1
  };
  office = {
    open: this.date(8),
    close: this.date(17),
    meridian: false
  }

  date(hour) {
    var d = new Date();
    d.setHours(hour);
    d.setMinutes(0);
    return d;
  }
}
