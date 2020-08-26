import {Component} from 'react';

export class BaseContainer extends Component {
  componentDidMount() {
    if(this.props.title) {
      document.title = this.props.title;
    }
  }

  componentWillUnmount() {
    if(this.props.initializeData) {
      this.props.initializeData();
    }
  }
}
