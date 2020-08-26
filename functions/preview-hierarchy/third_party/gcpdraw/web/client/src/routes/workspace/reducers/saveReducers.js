import {
  INITIALIZE_DATA
} from '../actions/workspaceActions';
import {
  OPEN_SAVE_WINDOW, CLOSE_SAVE_WINDOW, SAVE_REQUEST,
  SAVE_SUCCESS, SAVE_FAILURE
} from '../actions/saveActions';

const initialState = {
  isSaveWindowOpen: false,
  saving: false,
  saved: false,
  error: null
};

const reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case INITIALIZE_DATA:
      return initialState;

    case OPEN_SAVE_WINDOW:
      return {
        ...state,
        isSaveWindowOpen: true,
        saved: false
      }

    case CLOSE_SAVE_WINDOW:
      return {
        ...state,
        isSaveWindowOpen: false,
        saved: false
      }

    case SAVE_REQUEST:
      return {
        ...state,
        saving: true,
        error: null
      }

    case SAVE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
      }

    case SAVE_FAILURE:
      return {
        ...state,
        saving: false,
        error: action.error
      }

    default:
      return state;
  }
};

export default reducer;
