import axios from 'axios';

class DiagramApi {
  static path = '/api/v1/diagrams';

  static resourcePath(id) {
    return `${DiagramApi.path}/${id}`;
  }

  static list({ownername, query, popular}) {
    const params = [];
    if(ownername) {
      params.push(`ownername=${ownername}`);
    }
    if(query) {
      params.push(`q=${query}`);
    }
    if(popular) {
      params.push(`popular=${popular}`);
    }

    let path = DiagramApi.path;
    if(params.length > 0) {
      path += `?${params.join('&')}`
    }
    return axios.get(path);
  }

  static get(id) {
    return axios.get(DiagramApi.resourcePath(id));
  }

  static revisions(id) {
    return axios.get(`${DiagramApi.resourcePath(id)}/revisions`)
  }

  static create(data) {
    /*
     * Data keys:
     * - permission: string
     * - title: string
     * - code: string
     * - originId: string
     */
    return axios.post(DiagramApi.path, data);
  }

  static update(data, id) {
    /*
     * Data keys:
     * - permission: string
     * - title: string
     * - code: string
     */
    return axios.put(DiagramApi.resourcePath(id), data);
  }

  static delete(id) {
    return axios.delete(DiagramApi.resourcePath(id));
  }
}

export default DiagramApi;
