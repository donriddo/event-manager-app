import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';

import { eventActions } from '../../_actions';

import { Marker } from '../../_components';

// Return map bounds based on list of events
const getMapBounds = (map, maps, events) => {
    const bounds = new maps.LatLngBounds();

    events.forEach((event) => {
        bounds.extend(new maps.LatLng(
            event.location.coordinates[1],
            event.location.coordinates[0],
        ));
    });
    return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
        maps.event.addDomListener(window, 'resize', () => {
            map.fitBounds(bounds);
        });
    });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, events) => {
    // Get bounds by our events
    const bounds = getMapBounds(map, maps, events);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
};

const MapView = (props) => {
    function displayEvent(obj) {
        props.dispatch(eventActions.getOne(obj._id));
    }

    let defaultCenter = { lat: 59.95, lng: 30.33 }, defaultZoom = 11;

    let { events } = props;

    if (events.length) defaultCenter = {
        lat: events[0].location.coordinates[1],
        lng: events[0].location.coordinates[0],
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyB2Go1QEemwXagFTAFgBw4I06j9j4SVnt0' }}
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, events)}
            >
                {
                    events.map(ev => (
                        <Marker
                            key={ev._id}
                            lat={ev.location.coordinates[1]}
                            lng={ev.location.coordinates[0]}
                            title={ev.title}
                            onClick={() => displayEvent(ev)}
                        />
                    ))
                }
            </GoogleMapReact>
      </div>
    );
}

function mapStateToProps(state) {
    const { event } = state;
    return {
        event,
    };
}

const connectedMapView = connect(mapStateToProps)(MapView);
export { connectedMapView as MapView };