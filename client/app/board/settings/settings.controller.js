'use strict';


function holidays(data) {
  if(data.mode === 'day') {
    var day = new Date(data.date);
    if(day.getDate() > 15) {
      return 'holiday';
    }
  }
  return '';
}

function weekends(data) {
  if(data.mode === 'day') {
    var day = new Date(data.date);
    if([0, 6].indexOf(day.getDay()) > -1) {
      return true;
    }
  }
}

export default class SettingsController {
  dt = null;
  options = {
    showWeeks: false,
    startingDay: 1,
    minDate: '2016-01-01',
    yearColumns: 4,
    customClass: holidays,
    dateDisabled: weekends
  };
  office = {
    open: this.date(8),
    close: this.date(17),
    meridian: false
  }

  /*@ngInject*/
  constructor() {
  }

  date(hour) {
    var d = new Date();
    d.setHours(hour);
    d.setMinutes(0);
    return d;
  }
}
