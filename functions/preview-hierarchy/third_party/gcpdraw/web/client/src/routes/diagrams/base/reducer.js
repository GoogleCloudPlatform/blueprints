import { INITIALIZE,
  DIAGRAMS_LIST, DIAGRAMS_LIST_SUCCESS,
  DIAGRAMS_LIST_FAILURE} from './actions';
import Diagram from '../../../models/Diagram';

const initialState = {
  loaded: false,
  loading: false,
  loadError: null,
  query: null,
  diagrams: []
};

const reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case INITIALIZE:
      return initialState;

    case DIAGRAMS_LIST:
      return {
        ...state,
        loading: true,
        loadError: null
      }

    case DIAGRAMS_LIST_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        diagrams: Diagram.modelsFromArray(action.data.diagrams),
        query: action.query
      }

    case DIAGRAMS_LIST_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: false,
        loadError: action.error
      }

    default:
      return state;
  }
};

export default reducer;
