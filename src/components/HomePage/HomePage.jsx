import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { chunk } from 'lodash';

import { eventActions } from '../../_actions';

class Row extends React.Component {
    render() {
        return (
            <div className="row"> { this.props.children } </div>
        );
    }
}

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(eventActions.getEvents());
    }

    readMore(event) {
        this.props.dispatch(eventActions.readEvent(event));
    }

    render() {
        let { events } = this.props;
        if (events && events.length) {
            let chunkedEvents = chunk(events, 3);
            events = chunkedEvents.map((row, key) => (<Row key={key}>
                {
                    row.map((col, key) => (
                        <div key={key} className="col-md-4">
                            <div className="panel panel-primary">
                                <div className="panel-heading">{col.title}</div>
                                <div className="panel-body">
                                    <p>{col.draft.length > 100 ? `${col.draft.substr(0,100)}...` : col.draft}</p>
                                </div>
                                <div className="panel-footer">
                                    <button onClick={this.readMore.bind(this, col)} className="btn btn-xs btn-primary">Read more...</button>
                                    <p className="pull-right"><span style={{ marginRight: 3 }} className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>{col.votes ? col.votes : 0} votes</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Row>))
        }
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
                <div className="jumbotron">
                <h1>Welcome to Event Board</h1>
                <p>Here, you get all sorts of scintillating events from fictions to drama to real life events etc. Just jump right in and enjoy.</p>
                <p>After reading and enjoying, you can as well share your own events to by becoming an author</p>
                <p>You get a dashboard where you can manage your posts.</p>
                <p>Cheers!</p>
                <p><Link className="btn btn-lg btn-primary" to="/register">Become an Author</Link></p>
                </div>
                <div>
                    { events }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { event } = state;
    const { events } = event;
    return {
        events,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };