import { eventConstants } from '../_constants';

export function event(state = { typeOfView: 'list' }, action) {
  switch (action.type) {
    case eventConstants.CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case eventConstants.CREATE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case eventConstants.CREATE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case eventConstants.READ_EVENT:
      return {
        ...state,
        currentEvent: action.event
      };
    case eventConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case eventConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.events
      };
    case eventConstants.GETALL_FAILURE:
      return {
        ...state,
        items: [],
        error: action.error
      };
    case eventConstants.GETEVENTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case eventConstants.GETEVENTS_SUCCESS:
      return {
        ...state,
        events: action.events,
        loading: false
      };
    case eventConstants.GETEVENTS_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error
      };
    case eventConstants.UPVOTE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case eventConstants.UPVOTE_SUCCESS:
      return {
        ...state,
        currentEvent: action.event.votes ? action.event : state.currentEvent,
        loading: false
      };
    case eventConstants.UPVOTE_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error
      };
    case eventConstants.GETONE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case eventConstants.GETONE_SUCCESS:
      return {
        ...state,
        loading: false,
        view: action.event,
        showViewModal: true
      };
    case eventConstants.HIDE_VIEW_MODAL:
          return {
            ...state,
            loading: false,
            showViewModal: false
          };
    case eventConstants.CHANGE_VIEW:
      return {
        ...state,
        loading: false,
        typeOfView: action.view
      };
    case eventConstants.GETONE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case eventConstants.EDIT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case eventConstants.EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        edit: action.event,
      };
    case eventConstants.EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case eventConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case eventConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case eventConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case eventConstants.DELETE_REQUEST:
      // add 'deleting:true' property to event being deleted
      return {
        ...state,
        items: state.items.map(event =>
          event.id === action.id
            ? { ...event, deleting: true }
            : event
        )
      };
    case eventConstants.DELETE_SUCCESS:
      // remove deleted event from state
      return {
        items: state.items.filter(event => event.id !== action.id)
      };
    case eventConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to event 
      return {
        ...state,
        items: state.items.map(event => {
          if (event.id === action.id) {
            // make copy of event without 'deleting:true' property
            const { deleting, ...eventCopy } = event;
            // return copy of event with 'deleteError:[error]' property
            return { ...eventCopy, deleteError: action.error };
          }

          return event;
        })
      };
    default:
      return state
  }
}