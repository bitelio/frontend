'use strict';

export default class SettingsController {
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

  /*@ngInject*/
  constructor() {
    console.log(123);
  }

  date(hour) {
    var d = new Date();
    d.setHours(hour);
    d.setMinutes(0);
    return d;
  }
}
