import {
  INITIALIZE_DATA
} from '../actions/workspaceActions';
import {
  OPEN_EXPORT_WINDOW, CLOSE_EXPORT_WINDOW,
  AUTH_CHECK_REQUEST, AUTH_CHECK_SUCCESS, AUTH_CHECK_FAILURE,
  AUTHORIZE_REQUEST, AUTHORIZE_SUCCESS, AUTHORIZE_FAILURE,
  EXPORT_REQUEST, EXPORT_SUCCESS, EXPORT_FAILURE,
} from '../actions/exportActions';

const initialState = {
  isExportWindowOpen: false,
  authorizing: false,
  isAuthorized: false,
  exporting: false,
  exported: false,
  previewUrl: null,
  editUrl: null,
  title: null,
  error: null
};

const reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case INITIALIZE_DATA:
      return initialState;

    case OPEN_EXPORT_WINDOW:
      return {
        ...state,
        isExportWindowOpen: true
      }

    case CLOSE_EXPORT_WINDOW:
      return {
        ...state,
        isExportWindowOpen: false,
        exported: false,
      }

    case AUTH_CHECK_REQUEST:
      return {
        ...state,
        // loading: true,
        error: null,
      }

    case AUTH_CHECK_SUCCESS:
      return {
        ...state,
        // loading: false,
        isAuthorized: action.isAuthorized
      }

    case AUTH_CHECK_FAILURE:
      return {
        ...state,
        // loading: false,
        error: action.error
      }

    case AUTHORIZE_REQUEST:
      return {
        ...state,
        authorizing: true,
        error: null
      }

    case AUTHORIZE_SUCCESS:
      return {
        ...state,
        authorizing: false,
        isAuthorized: true
      }

    case AUTHORIZE_FAILURE:
      return {
        ...state,
        authorizing: false,
        isAuthorized: false,
        error: action.error
      }

      case EXPORT_REQUEST:
        return {
          ...state,
          exporting: true,
          error: null
        }

      case EXPORT_SUCCESS:
        return {
          ...state,
          exporting: false,
          exported: true,
          previewUrl: action.previewUrl,
          editUrl: action.editUrl,
          title: action.title
        }

      case EXPORT_FAILURE:
        return {
          ...state,
          exporting: false,
          error: action.error
        }

    default:
      return state;
  };
};

export default reducer;
