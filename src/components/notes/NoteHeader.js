/* eslint react/prop-types: 0 */
/* eslint space-infix-ops: 0 */
/* eslint indent: 0 */
/* eslint react/sort-comp: 0 */
/* eslint no-var: 0 */
/* eslint vars-on-top: 0 */
/* eslint no-else-return: 0 */

import { Component } from 'react';
import moment from 'moment';
import React from 'react';

// Returns the date object corresponding to the last time it was 4 am.
function getBeginningOfToday() {
  // 4 am on current date.
  const fourAM = moment().startOf('day').add(4, 'hours');
  // If this moment is in the past, then this is the beginning of "today".
  if ( fourAM < moment()) {
    return fourAM;
  }
  // Otherwise (i.e., the time is between midnight and 4 am.), subtract
  // one day.
  return fourAM.subtract(1, 'day');
}

function getDurationUntilToday(time) {
  return moment.duration(getBeginningOfToday().diff(moment(time)));
}

function getDurationClass(time) {
  const durationUntilToday = getDurationUntilToday(time);

  if (durationUntilToday.as('seconds') < 1) {
    return 'today';
  } else if (durationUntilToday.as('days') < 1) {
    return 'yesterday';
  } else if (durationUntilToday.as('weeks') < 1) {
    return 'this-week';
  } else if (durationUntilToday.as('weeks') < 2) {
    return 'last-week';
  } else {
    return 'earlier';
  }
}

export default class extends Component {
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
      <div className="note-header">
        <span
          className={ 'note-date note-date-' + this.getDurationClass() }
          onClick={() => this.props.onClick()}>
          {this.getFormattedTime()}
        </span>
      </div>
    );
  }
}
