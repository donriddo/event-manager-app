import React from 'react';
import { connect } from 'react-redux';
import { geocodeByAddress } from 'react-places-autocomplete';

import { eventActions } from '../../_actions';

import Autocomplete from '../general/Autocomplete';

class NewEvent extends React.Component {
    constructor() {
        super();
        this.state = {
          title: '',
          details: '',
          address: '',
          from: '',
          to: '',
          lat: '',
          lng: '',
        };
      }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleAddress(field, value) {
        this.setState({ [field]: value });
    }

    geocodeAddress(address) {
        geocodeByAddress(address)
            .then((results) => {
                const lat = results[0].geometry.location.lat();
                const lng = results[0].geometry.location.lng();
                this.setState({
                    address: results[0].formatted_address,
                    lat,
                    lng,
                });
                
            })
            .catch(error => dispatch(failure(error)));
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.dispatch(eventActions.create({
            title: this.state.title,
            details: this.state.details,
            address: this.state.address,
            from: this.state.from,
            to: this.state.to,
            coordinates: { long: this.state.lng, lat: this.state.lat },
        }));
    }

    render() {
        const { title, details, address, from ,to } = this.state;
        const searchOptions = { types: ['geocode'] };

        return (
      <div className="modal fade" id="newEvent" tabIndex="-1" role="dialog" 
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
                        New Event
                    </h4>
                </div>
                
                <div className="modal-body">
                    
                    <form name="form" onSubmit={this.handleSubmit.bind(this)} className="form-horizontal" role="form">
                    <div className="form-group">
                        <label  className="col-sm-2 control-label"
                                htmlFor="title">Title</label>
                        <div className="col-sm-10">
                            <input value={title} type="text" className="form-control" 
                            id="title" name="title" placeholder="Title" onChange={this.handleChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label"
                            htmlFor="details" >Details</label>
                        <div className="col-sm-10">
                            <textarea value={details} style={{ height: 150 }} className="form-control"
                                id="details" name="details" placeholder="Type details here..." onChange={this.handleChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label"
                            htmlFor="address" >Address</label>
                        <div className="col-sm-10">
                            <Autocomplete
                                value={address || ''}
                                onChange={this.handleAddress.bind(this, 'address')}
                                onSelect={this.geocodeAddress.bind(this)}
                                searchOptions={searchOptions}
                                placeholder="Enter the address"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label"
                            htmlFor="from" >Start Date</label>
                        <div className="col-sm-10">
                            <input type="date" value={from} className="form-control"
                                id="from" name="from" placeholder="Start Date" onChange={this.handleChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label"
                            htmlFor="to" >End Date</label>
                        <div className="col-sm-10">
                            <input type="date" value={to} className="form-control"
                                id="to" name="to" placeholder="End Date" onChange={this.handleChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                        <button className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                    </form>
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

const connectedNewEvent = connect(mapStateToProps)(NewEvent);
export { connectedNewEvent as NewEvent };