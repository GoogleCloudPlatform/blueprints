import {
  GET_COMMUNITY_ICONS_REQUEST,
  GET_COMMUNITY_ICONS_SUCCESS,
  GET_COMMUNITY_ICONS_FAILURE
} from '../actions/communityIconsActions';

const initialState = {
  loading: false,
  initialized: false,
  error: null,
  icons: []
};

const reducer = (state = initialState, actions = {}) => {
  switch(actions.type) {
    case GET_COMMUNITY_ICONS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case GET_COMMUNITY_ICONS_SUCCESS:
      return {
        ...state,
        loading: false,
        icons: actions.icons
      }

    case GET_COMMUNITY_ICONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      }

    default:
      return state;
  }
};

export default reducer;
