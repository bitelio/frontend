'use strict';

export default class StationsController {
  constructor(Board, $templateCache) {
    'ngInject';

    this.Board = Board;
    this.editable = Board.Role == 'administrator';
    this.selected = {};
    this.stations = [];
    Board.Stations.then(res => {
      this.stations = res;
      this.stations.push({Name: 'test'});
    });
    $templateCache.put('show-station', require('./station.show.pug'));
    $templateCache.put('edit-station', require('./station.edit.pug'));
  }

  // TODO: tab to next row, check lanes in station, fix sortable

  modified = true;

  sortable = {
    animation: 350,
    handle: '.fa-bars',
    forceFallback: true
  }

  select(selection) {
    this.stations.map((station, index) => {
      station.selected = index == selection;
      return station;
    });
  }

  add() {
    this.stations.push({
      Name: '',
      Card: 0,
      Size: 0,
      Phase: ''
    });
  }

  remove(index) {
    this.stations.splice(index, 1);
  }

  save() {
    this.Board.stations.put(this.stations)
      .then(stations => {
        this.stations = stations;
      });
  }

  validate(input) {
    console.log(input);
    input.$setValidity('valid', true);
    input.hasError = isNaN(input.value)
      ? 'has-error has-feedback'
      : null;
  }

  update() {
    this.phases = this.stations.map(station => station.Phase);
  }
}
