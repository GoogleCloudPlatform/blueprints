import {
  INITIALIZE_DATA
} from '../actions/workspaceActions';
import {
  OPEN_DELETE_WINDOW, CLOSE_DELETE_WINDOW, DELETE_REQUEST,
  DELETE_SUCCESS, DELETE_FAILURE
} from '../actions/deleteActions';

const initialState = {
  isDeleteWindowOpen: false,
  deleting: false,
  deleted: false,
  error: null
};

const reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case INITIALIZE_DATA:
      return initialState;

    case OPEN_DELETE_WINDOW:
      return {
        ...state,
        isDeleteWindowOpen: true,
      }

    case CLOSE_DELETE_WINDOW:
      return {
        ...state,
        isDeleteWindowOpen: false,
        deleted: false
      }

    case DELETE_REQUEST:
      return {
        ...state,
        deleting: true,
        error: null
      }

    case DELETE_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
      }

    case DELETE_FAILURE:
      return {
        ...state,
        deleting: false,
        error: action.error
      }

    default:
      return state;
  }
};

export default reducer;
