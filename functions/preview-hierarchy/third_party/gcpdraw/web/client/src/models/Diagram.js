import _ from 'underscore';
import Moment from 'moment';

class Diagram {
  id;
  data;
  validated;
  errorMessages = [];

  static PERMISSION = {
    Private: {
      value: 'PRIVATE',
      icon: 'lock',
      description: 'Only visible to you'
    },
    Unlisted: {
      value: 'UNLISTED',
      icon: 'link',
      description: 'Visible to anyone with the link'
    },
    Public: {
      value:'PUBLIC',
      icon: 'unlock',
      description: 'Visible to anyone at Google'
    }
  };

  static DEFAULT_DATA = {
    permission: this.PERMISSION.Private,
    title: '',
    ownername: '',
    code: '',
    svg: '',
    createdAt: '',
    updatedAt: ''
  };

  static MUTABLE_ATTRIBUTES = [
    'permission', 'title', 'code'
  ];

  static DATETIME_FORMAT_CLIENT = 'YYYY-MM-DD h:mm a';

  static prettyDateTime(datetime) {
    return Moment(datetime).format(Diagram.DATETIME_FORMAT_CLIENT);
  }

  static timeSince(datetime) {
    return Moment(datetime).fromNow();
  }

  constructor(data) {
    if(!data) { data = {}; }
    this.id = data.id;
    this.data = _.extend({}, Diagram.DEFAULT_DATA, data);
  }

  /*
   * Update
   */
  updateTitle(title) {
    this.data.title = title;
  }

  updatePermission(permission) {
    this.data.permission = permission
  }

  updateCode(code) {
    this.data.code = code;
  }

  /*
   * Validation
   */
  validate() {
    this.errorMessages = [];

    if(this.permission !== Diagram.PERMISSION) {
      this.errorMessages.push('Please set privacy');
    }

    this.validated = true;
  }

  /*
   * Helpers
   */
  get canCreate() {
    return this.id || (this.code && this.code.length > 0);
  }

  /*
   * Getter
   */
  get clientPath() { return `/diagrams/${this.id}`; }
  get clientForkPath() { return `/diagrams/new?srcId=${this.id}`}
  get payload() { return _.pick(this.data, Diagram.MUTABLE_ATTRIBUTES); }
  get permission() { return this.data.permission; }
  get title() { return this.data.title; }
  get ownername() { return this.data.ownername; }
  get code() { return this.data.code; }
  get svg() { return this.data.svg; }
  get createdAt() { return this.data.createdAt; }
  get updatedAt() { return this.data.updatedAt; }
  get prettyUpdatedAt() { return Diagram.timeSince(this.updatedAt); }
  get permissionText() {
    switch (this.permission) {
      case Diagram.PERMISSION.Private.value:
        return Diagram.PERMISSION.Private.description;
      case Diagram.PERMISSION.Unlisted.value:
        return Diagram.PERMISSION.Unlisted.description;
      case Diagram.PERMISSION.Public.value:
        return Diagram.PERMISSION.Public.description;
      default:
        console.log('Invalid permission');
        return Diagram.PERMISSION.Private.description;
    }
  }
  get permissionIcon() {
    switch (this.permission) {
      case Diagram.PERMISSION.Private.value:
        return Diagram.PERMISSION.Private.icon;
      case Diagram.PERMISSION.Unlisted.value:
        return Diagram.PERMISSION.Unlisted.icon;
      case Diagram.PERMISSION.Public.value:
        return Diagram.PERMISSION.Public.icon;
      default:
        console.log('Invalid permission');
        return Diagram.PERMISSION.Private.icon;
    }
  }
  get canEdit() {
    return !!window.currentUsername
     && window.currentUsername === this.ownername;
  }

  /*
   * Collection
   */
  static modelsFromArray(arr) {
    if(!arr || arr.length === 0) { return []; }
    return arr.map(a => {
      return new Diagram(a);
    });
  }
}

export default Diagram;
