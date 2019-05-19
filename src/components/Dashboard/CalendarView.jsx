import React from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

import { eventActions } from '../../_actions';

const CalendarView = (props) => {
    function displayEvent(obj) {
        props.dispatch(eventActions.getOne(obj._id));
    }

    let { events } = props;

    events = events.map(ev => {
        ev.from = new Date(ev.from);
        ev.to = new Date(ev.to);
        return ev;
    })

    return (
        <div>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="from"
                endAccessor="to"
                defaultView="week"
                onSelectEvent={displayEvent}
            />
        </div>
    );
}

function mapStateToProps(state) {
    const { event } = state;
    return {
        event,
    };
}

const connectedCalendarView = connect(mapStateToProps)(CalendarView);
export { connectedCalendarView as CalendarView };