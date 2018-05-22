'use strict';

import _ from 'lodash';

export default class StationsController {
  constructor($templateCache, Board, notify, lanes, stations) {
    'ngInject';

    this.Board = Board;
    this.notify = notify;
    this.editable = Board.Role == 'administrator';
    this.stations = stations;
    this.boardHeight = `${Math.max(...lanes.map(lane => lane.Height))}px`;
    this.lanes = lanes.reduce((table, lane) => {
      table[lane.Id] = lane;
      return table;
    }, {});
    this.refresh();

    $templateCache.put('show-station', require('./station.show.pug'));
    $templateCache.put('edit-station', require('./station.edit.pug'));
  }

  sortable = {
    animation: 350,
    handle: '.fa-bars',
    forceFallback: true
  }

  styling(lane) {
    const s = ['left', 'top', 'width', 'height'].reduce((style, attr) => {
      style[attr] = `${lane[_.capitalize(attr)]}px`;
      return style;
    }, {});
    if(!lane.Top) s['text-transform'] = 'uppercase';
    return s;
  }

  children(lane) {
    let ids = lane.ChildLaneIds.map(laneId => this.children(this.lanes[laneId]));
    if(ids.length > 0) return _.flattenDeep(ids);
    else return [lane.Id];
  }

  select(lane) {
    if(this.station) {
      const childLaneIds = this.children(lane);
      const diff = _.difference(childLaneIds, this.station.Lanes);
      this.stations.forEach(station => {
        station.Lanes = _.pullAll(station.Lanes, childLaneIds);
      });
      if(diff.length > 0) {
        this.station.Lanes = _.union(this.station.Lanes, childLaneIds);
      }
      this.modified = true;
    }
  }

  edit(station) {
    this.station = station;
    if(station.Lanes.length > 0) {
      const limits = station.Lanes.reduce((limit, laneId) => {
        const lane = this.lanes[laneId];
        limit[0] = Math.min(limit[0], lane.Left);
        limit[1] = Math.max(limit[1], lane.Left + lane.Width);
        return limit;
      }, [Infinity, 0]);
      const board = document.getElementsByClassName('board')[0];
      const width = limits[1] - limits[0];
      if(width > board.offsetWidth) board.scrollLeft = limits[0];
      else board.scrollLeft = (width - board.offsetWidth) / 2 + limits[0];
    }
  }

  add() {
    this.station = {
      Name: '',
      Card: 0,
      Size: 0,
      Phase: '',
      Lanes: []
    };
    this.stations.push(this.station);
    this.modified = true;
  }

  remove(index) {
    this.station = null;
    this.stations.splice(index, 1);
    this.modified = true;
  }

  save() {
    this.station = null;
    const data = {Body: this.stations};
    this.Board.post('/stations', data)
      .then(stations => {
        this.stations = stations;
        this.modified = false;
      })
      .catch(err => {
        this.notify.error(err.data);
      });
  }

  refresh() {
    const phases = this.stations
      .map(station => station.Phase)
      .filter(phase => phase);
    this.phases = _.uniq(phases).sort();
  }
}
