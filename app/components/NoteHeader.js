import { Component } from 'react';
import moment from 'moment';
import React from 'react';

function getDurationClass(time) {
  const timeMoment = moment(time);
  time = timeMoment.toDate();
  const rightNow = new Date();
  const beginningOfToday = new Date(new Date().setHours(4)); // 4 am on the same day.
  var timeBeforeToday = moment.duration(beginningOfToday - time);
  if (beginningOfToday > rightNow) {
    timeBeforeToday.subtract(24, 'hours');
  }

  if (timeBeforeToday.as('seconds') < 0) {
    return 'today';
  } else if (timeBeforeToday.as('hours') < 24) {
    return 'yesterday';
  } else if (timeBeforeToday.as('days') < 7) {
    return 'this-week';
  } else if (timeBeforeToday.as('days') < 14) {
    return 'last-week';
  } else {
    return 'earlier';
  }
}

export class NoteHeader extends Component {
  constructor() {
    super();
  }

  getDurationClass() {
    return getDurationClass(this.props.timeCreated);
  }

  getFormattedTime() {
    const timeMoment = moment(this.props.timeCreated);
    const durationClass = this.getDurationClass();
    const time = timeMoment.format('h:mm a');
    const dayOfWeek = timeMoment.format('dddd');

    switch (durationClass) {
      case 'today':
        return 'Today, ' + time;
      case 'yesterday':
        return 'Yesterday, ' + time;
      case 'this-week':
        return dayOfWeek + ' this week, ' + time;
      case 'last-week':
        return dayOfWeek + ' last week, ' + time;
      default:
        return timeMoment.format('dd, MMM D, YYYY, h:mm a');
    }
  }

  render() {
    return (
      <div className='note-header'>
        <span
          className={ 'note-date note-date-' + this.getDurationClass() }
          onClick={() => this.props.onClick()}>
          {this.getFormattedTime()}
        </span>
      </div>
    );
  }
}