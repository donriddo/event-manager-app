import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { eventActions } from '../../_actions';

class EventPage extends React.Component {

    upVote(id) {
      this.props.dispatch(eventActions.upVote(id));
    }

    render() {
        const { currentEvent } = this.props;
        return (
            <div className="container">
            <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="/">Event Board</a>
    </div>


    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/login">Login or Register</Link></li>
      </ul>
    </div>
  </div>
</nav>
  { currentEvent ?
    <div>
    <h1>{ currentEvent.title }</h1>
    <p>{ currentEvent.draft }</p>
    <div>
      <span className="badge text-success">
          PUBLISHED: {new Date(currentEvent.publishedAt || currentEvent.updatedAt).toString().substr(0,15)}
      </span>
      <span style={{ marginLeft: 10 }} className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> {currentEvent.votes ? currentEvent.votes : 0} votes
      <div className="pull-right">
          <button onClick={this.upVote.bind(this, currentEvent._id)} type="button" className="btn btn-success btn-xs" aria-label="Left Align">
              <span style={{ marginRight: 3 }} className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
              Upvote
          </button>
      </div>
  </div>
  </div> : <div></div>
  }
</div>
        );
    }
}

function mapStateToProps(state) {
    const { event } = state;
    const { currentEvent } = event;
    return {
        currentEvent,
    };
}

const connectedEventPage = connect(mapStateToProps)(EventPage);
export { connectedEventPage as EventPage };