import config from 'config';
import { authHeader } from '../_helpers';
import { logout } from './user.service';
import { history } from '../_helpers';

export const eventService = {
    create,
    getAll,
    getTodayEvents,
    getEvents,
    getById,
    voteEvent,
    update,
    delete: _delete
};

function create(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiUrl}/event`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/event`, requestOptions).then(handleResponse);
}

function getTodayEvents() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/event/today`, requestOptions).then(handleResponse);
}

function getEvents() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${config.apiUrl}/event/published`, requestOptions).then(handleResponse);
}

function voteEvent(id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    };

    return fetch(`${config.apiUrl}/event/vote`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/event/${id}`, requestOptions).then(handleResponse);
}

function update(event) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    };

    return fetch(`${config.apiUrl}/event/${event._id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/event/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    console.log('Raw response: ', response);
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            history.push('/login');
        }

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}