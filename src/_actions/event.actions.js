import { eventConstants } from '../_constants';
import { eventService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const eventActions = {
    create,
    getOne,
    getAll,
    getTodayEvents,
    getEvents,
    readEvent,
    upVote,
    edit,
    update,
    delete: _delete,
    hideViewModal,
    changeViewTo,
};

function create(data) {
    return dispatch => {
        dispatch(request(data));

        eventService.create(data)
            .then(
                event => { 
                    dispatch(success(event));
                    dispatch(alertActions.success(event.message));
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(event) { return { type: eventConstants.CREATE_REQUEST, event } }
    function success(event) { return { type: eventConstants.CREATE_SUCCESS, event } }
    function failure(error) { return { type: eventConstants.CREATE_FAILURE, error } }
}

function readEvent(event) {
    return dispatch => {
        dispatch(read(event));
        history.push('/event');
    };

    function read(event) { return { type: eventConstants.READ_EVENT, event } }
}

function hideViewModal() {
    return dispatch => dispatch(hide());

    function hide() { return { type: eventConstants.HIDE_VIEW_MODAL } }
}

function changeViewTo(view) {
    return dispatch => dispatch(change(view));

    function change(view) { return { type: eventConstants.CHANGE_VIEW, view } }
}

function getEvents() {
    return dispatch => {
        dispatch(request());

        eventService.getEvents()
            .then(
                events => {
                    dispatch(success(events.data));
                    dispatch(alertActions.success(events.message));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: eventConstants.GETEVENTS_REQUEST } }
    function success(events) { return { type: eventConstants.GETEVENTS_SUCCESS, events } }
    function failure(error) { return { type: eventConstants.GETEVENTS_FAILURE, error } }
}

function upVote(id) {
    return dispatch => {
        dispatch(request(id));

        eventService.voteEvent(id)
            .then(
                event => dispatch(success(event)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: eventConstants.UPVOTE_REQUEST, id } }
    function success(event) { return { type: eventConstants.UPVOTE_SUCCESS, event } }
    function failure(error) { return { type: eventConstants.UPVOTE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        eventService.getAll()
            .then(
                events => {
                    dispatch(success(events.data));
                    dispatch(alertActions.success(events.message));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: eventConstants.GETALL_REQUEST } }
    function success(events) { return { type: eventConstants.GETALL_SUCCESS, events } }
    function failure(error) { return { type: eventConstants.GETALL_FAILURE, error } }
}

function getTodayEvents() {
    return dispatch => {
        dispatch(request());

        eventService.getTodayEvents()
            .then(
                events => {
                    dispatch(success(events.data));
                    dispatch(alertActions.success(events.message));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: eventConstants.GETALL_REQUEST } }
    function success(events) { return { type: eventConstants.GETALL_SUCCESS, events } }
    function failure(error) { return { type: eventConstants.GETALL_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());

        eventService.getById(id)
            .then(
                event => {
                    dispatch(success(event.data));
                    dispatch(alertActions.success(event.message));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: eventConstants.GETONE_REQUEST } }
    function success(event) { return { type: eventConstants.GETONE_SUCCESS, event } }
    function failure(error) { return { type: eventConstants.GETONE_FAILURE, error } }
}

function edit(event) {
    return dispatch => {
        dispatch(request(event));

        dispatch(success(event));
    };

    function request(event) { return { type: eventConstants.EDIT_REQUEST, event } }
    function success(event) { return { type: eventConstants.EDIT_SUCCESS, event } }
    function failure(event, error) { return { type: eventConstants.EDIT_FAILURE, event, error } }
}

function update(event) {
    return dispatch => {
        dispatch(request(event));

        eventService.update(event)
            .then(
                (event) => {
                    dispatch(success(event.data));
                    window.location.reload();
                    dispatch(alertActions.success(event.message));
                },
                error => {
                    dispatch(failure(event, error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(event) { return { type: eventConstants.UPDATE_REQUEST, event } }
    function success(event) { return { type: eventConstants.UPDATE_SUCCESS, event } }
    function failure(event, error) { return { type: eventConstants.UPDATE_FAILURE, event, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        eventService.delete(id)
            .then(
                event => {
                    dispatch(success(id));
                    dispatch(alertActions.success(event.message));
                },
                error => {
                    dispatch(failure(id, error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: eventConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: eventConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: eventConstants.DELETE_FAILURE, id, error } }
}