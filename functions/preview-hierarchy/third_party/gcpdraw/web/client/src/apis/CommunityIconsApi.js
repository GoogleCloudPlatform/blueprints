import axios from 'axios';

class CommunityIconsApi {
  static basePath = '/api/v1/community_icons';

  static get() {
    return axios.get(`${CommunityIconsApi.basePath}`);
  }
};

export default CommunityIconsApi;
