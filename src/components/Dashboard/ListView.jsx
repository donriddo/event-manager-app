import React from 'react';
import { connect } from 'react-redux';

import { eventActions } from '../../_actions';

const ListView = (props) => {
    function displayEvent(obj) {
        props.dispatch(eventActions.getOne(obj._id));
    }

    let { events } = props;

    if (events.length) {
        events = events.map((s, key) => (
            <tr key={key}>
                <td>{s.title}</td>
                <td>{`${s.details.substr(0,15)}...`}</td>
                <td>{s.user && `${s.user.firstName} ${s.user.lastName}`}</td>
                <td>{s.address}</td>
                <td>{new Date(s.from).toString().substr(0,15)}</td>
                <td>{new Date(s.to).toString().substr(0,15)}</td>
                <td><button onClick={() => displayEvent(s)} type="button" className="btn btn-default">View</button></td>
                <td><button onClick={() => this.loadEdit(s)} type="button" className="btn btn-warning" data-toggle="modal" data-target="#editEvent">Edit</button></td>
            </tr>
        ))
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Details</th>
                    <th>Host</th>
                    <th>Address</th>
                    <th>From</th>
                    <th>To</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    events
                }
                </tbody>
            </table>
        </div>
    );
}

function mapStateToProps(state) {
    const { event } = state;
    return {
        event,
    };
}

const connectedListView = connect(mapStateToProps)(ListView);
export { connectedListView as ListView };