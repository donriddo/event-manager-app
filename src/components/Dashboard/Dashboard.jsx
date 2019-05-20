import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { eventActions, userActions } from '../../_actions';

import { NewEvent, ViewEvent } from '../Event';
import { CalendarView, ListView, MapView } from '.'

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
          toShowPublished: true,
          toShow: 'mine',
          title: '',
          draft: '',
          published: false,
          edit: {},
          filter: ''
        };
      }

    componentDidMount() {
        this.props.dispatch(userActions.getMyEvents());
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    changeViewTo(e) {
        this.props.dispatch(eventActions.changeViewTo(e.target.value))
    }

    filterEvents(e) {
        const { value } = e.target;
        this.setState({ filter: value });
    }

    handleEditChange(e) {
        const { name, value } = e.target;
        const { edit } = this.state;
        edit[name] = value;
        this.setState({ edit });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.dispatch(eventActions.create({
            title: this.state.title,
            draft: this.state.draft,
            published: !!this.state.published,
        }));

        // $('#mewEvent .close').click();
    }

    handleUpdate (e) {
        e.preventDefault();

        this.props.dispatch(eventActions.update({
            title: this.state.edit.title,
            draft: this.state.edit.draft,
            _id: this.state.edit._id
        }));
    }

    showPublishedEvents(bool) {
        this.setState({ toShowPublished: bool });
    }

    showEvents(which) {
        switch (which) {
            case 'all':
                this.props.dispatch(eventActions.getAll());
                this.setState({ toShow: 'all' });
                break;
            case 'mine':
                this.props.dispatch(userActions.getMyEvents());
                this.setState({ toShow: 'mine' });
                break;
            case 'today':
                this.props.dispatch(eventActions.getTodayEvents());
                this.setState({ toShow: 'today' });
                break;
            default:
                this.props.dispatch(eventActions.getAll());
        }
    }

    loadEdit(event) {
        this.props.dispatch(eventActions.edit(event));
        this.setState({ edit: event });
    }

    handleDeleteEvent(id) {
        return (e) => this.props.dispatch(eventActions.delete(id));
    }

    render() {
        const { event } = this.props;
        let events = event && event.items && event.items.length ? event.items : [];

        if (!!this.state.filter) {
            const filter = this.state.filter.toLowerCase();
            events = events.filter(event => event.title.toLowerCase().includes(filter));
        }

        return (
            <div className="container">
            <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Event Board</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/login">Logout</Link></li>
          </ul>
          <form className="navbar-form navbar-right">
            <input onChange={this.filterEvents.bind(this)} type="text" className="form-control" placeholder="Filter Events..." />
          </form>
        </div>
      </div>
    </nav>
      <div className="row">
        <div className="col-sm-3 col-md-2 sidebar">
          <ul className="nav nav-sidebar">
            <li className={this.state.toShow === 'mine' ? "active" : ""}><a onClick={this.showEvents.bind(this, 'mine')}>My Events <span className="sr-only">(current)</span></a></li>
            <li className={this.state.toShow === 'today' ? "active" : ""}><a onClick={this.showEvents.bind(this, 'today')}>Today's Events</a></li>
            <li className={this.state.toShow === 'all' ? "active" : ""}><a onClick={this.showEvents.bind(this, 'all')}>All Events</a></li>
          </ul>
        </div>
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 className="page-header">Dashboard</h1>

          <h4 className="sub-header">
            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#newEvent">
                <span style={{ marginRight: 3 }} className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                Add New Event
            </button>
            <form className="navbar-form navbar-right">
                <select onChange={this.changeViewTo.bind(this)} name="view" id="view">
                    <option value="list">List View</option>
                    <option value="calendar">Calendar View</option>
                    <option value="map">Map View</option>
                </select>
            </form>
          </h4>
          { event.typeOfView === 'calendar' && <CalendarView events={events} /> }
          { event.typeOfView === 'list' &&<ListView events={events} /> }
          { event.typeOfView === 'map' &&<MapView events={events} /> }
        </div>
      </div>
      <NewEvent />
      { event.showViewModal && <ViewEvent /> }
    <div className="modal fade" id="editEvent" tabIndex="-1" role="dialog" 
     aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" 
                    data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">Close</span>
                    </button>
                    <h4 className="modal-title" id="myModalLabel">
                        Edit Event
                    </h4>
                </div>
                
                <div className="modal-body">
                    <p>Feature yet to be added...</p>
                    <p>Please Check Back Later</p>
                </div>
            </div>
        </div>
    </div>
    
    </div>
        );
    }
}

function mapStateToProps(state) {
    const { event } = state;
    return {
        event,
    };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };