import axios from 'axios';

class DrawApi {
  static basePath = '/render';

  static svg(code, disableDropShadow = true) {
    return axios.post(`${DrawApi.basePath}/svg`, {code, disableDropShadow});
  }
}

export default DrawApi;
