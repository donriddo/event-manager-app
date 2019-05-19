import toastr from 'reactjs-toastr';
import { alertConstants } from '../_constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      toastr.success(action.message, 'Success', { displayDuration: 3000 });
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.ERROR:
      toastr.error(action.message, 'Error', { displayDuration: 3000 });
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}