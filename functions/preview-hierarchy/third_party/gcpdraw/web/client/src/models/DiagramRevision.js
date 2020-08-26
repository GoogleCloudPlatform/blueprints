import _ from 'underscore';
import Moment from 'moment';

class DiagramRevision {
  id;
  data;

  static DEFAULT_DATA = {
    revisionId: '',
    revisionAt: '',
    code: ''
  };

  constructor(data) {
    if(!data) { data = {}; }
    this.id = data.revisionId;
    this.data = _.extend({}, DiagramRevision.DEFAULT_DATA, data)
  }

  /** Getter */
  get revisionId() { return this.id; }
  get revisionAt() { return Moment(this.data.revisionAt).fromNow(); }
  get code() { return this.data.code; }

  static modelsFromArray(arr) {
    if(!arr || arr.length === 0) { return []; }
    return arr.map(a => {
      return new DiagramRevision(a);
    });
  }
}

export default DiagramRevision;
