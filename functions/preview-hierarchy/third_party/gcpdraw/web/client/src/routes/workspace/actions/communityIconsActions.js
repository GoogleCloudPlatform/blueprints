import Api from '../../../apis/CommunityIconsApi';


export const GET_COMMUNITY_ICONS_REQUEST = 'communityIcons/get/request';
const getCommunityIconsRequest = () => {
  return {
    type: GET_COMMUNITY_ICONS_REQUEST
  }
};


export const GET_COMMUNITY_ICONS_SUCCESS = 'communityIcons/get/success';
const getCommunityIconsSuccess = (data) => {
  return {
    type: GET_COMMUNITY_ICONS_SUCCESS,
    icons: data.icons
  }
};


export const GET_COMMUNITY_ICONS_FAILURE = 'communityIcons/get/failure';
const getCommunityIconsFailure = (error) => {
  return {
    type: GET_COMMUNITY_ICONS_FAILURE,
    error: error.message
  }
};

export const getCommunityIcons = () => {
  return (dispatch) => {
    dispatch(getCommunityIconsRequest());
    return Api.get()
      .then(res => {
        dispatch(getCommunityIconsSuccess(res.data));
      }).catch(error => {
        console.error(error);
        dispatch(getCommunityIconsFailure(error));
      });
  }
};
