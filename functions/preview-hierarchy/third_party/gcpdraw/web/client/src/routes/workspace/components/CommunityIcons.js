import React, {Component} from "react";
import {InModalError} from "../../../components/Errors";
import NoFilteredResult from './NoFilteredResult';

const btnText = {
  normal: 'Copy URL',
  clicked: 'Copied!'
};

const ICON_IMAGE_LOADING = 0;
const ICON_IMAGE_LOADED = 1;
const ICON_IMAGE_ERROR = 2;

class ImageWithStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {status:ICON_IMAGE_LOADING};
  }

  handleImageLoad() {
    this.setState({status:ICON_IMAGE_LOADED});
  }

  handleImageLoadError() {
    this.setState({status: ICON_IMAGE_ERROR});
  }

  render() {
    const {src, alt, className, spinnerClassName} = this.props;
    const {status} = this.state;

    return (
      <React.Fragment>
        {status === ICON_IMAGE_LOADING &&
          <div className={spinnerClassName} role="status">
            <span className="sr-only">Loading...</span>
          </div>
        }
        <img src={src}
          className={(status === ICON_IMAGE_LOADED) ? className : `${className}--loading`}
          alt={alt}
          onLoad={this.handleImageLoad.bind(this)}
          onError={this.handleImageLoadError.bind(this)} />
      </React.Fragment>
    );
  }

}

class IconRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlButtonText: btnText.normal,
      timerId: null
    }
  }
  onClick(url) {
    navigator.clipboard.writeText(url);

    if (this.state.timerId !== null) {
      clearTimeout(this.state.timerId)
    }

    let timerId = setTimeout(function(){
      this.setState({
        urlButtonText: btnText.normal,
        timerId: null
      })
    }.bind(this), 1000);
    this.setState({
      urlButtonText: btnText.clicked,
      timerId: timerId
    });
  }

  render() {
    const {name, linkUrl, displayUrl} = this.props.row;
    return (
        <tr>
          <td className='text-center'>
            {displayUrl &&
              <ImageWithStatus
                src={displayUrl} className='custom-icon' alt={name}
                spinnerClassName='spinner-border spinner-border-sm text-gray-300'/>}
          </td>
          <td>{name}</td>
          <td>
            <button
                type='button'
                className='btn btn-secondary btn-xs'
                onClick={this.onClick.bind(this, linkUrl)}>{this.state.urlButtonText}</button>
          </td>
        </tr>
    );
  }
}

const Accessories = ({getCommunityIcons}) => (
  <div className='ref-pane-control-bar ref-pane-controls d-flex'>
    <div className='item flex-even'>
      <a className=''
         target='_blank' rel='noopener noreferrer'
         href='http://go/gcpdraw-custom-icons'>
        <i className='fas fa-info-circle pr-1' />
        How to Use</a>
    </div>
    <div className='item flex-even'>
      <a
        href='http://go/gcpdraw-community-icons-folder'
        target='_blank' rel='noopener noreferrer'>
        <i className='fas fa-plus-circle pr-1' />
      Add New Icon</a>
    </div>
    <div className='item flex-even'>
      <button onClick={getCommunityIcons}>
        <i className='fas fa-sync-alt pr-1' />
        Refresh
      </button>
    </div>
  </div>
);

class CommunityIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {filterBar: null}
  }

  componentDidMount() {
    const {loading} = this.props.communityIcons;
    if(!loading) {
      this.props.getCommunityIcons();
    }
  }

  render() {
    const {loading, icons, error} = this.props.communityIcons;
    if(loading) {
      return (
          <div className="d-flex align-items-center justify-content-center m-5">
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>);
    }
    if(error) {
      return <InModalError error={error} />;
    }
    if(!icons || icons.length === 0) {
      return <InModalError error={"Cannot find Community Icons"} />;
    }

    const filteredIcons = icons.filter((data) => {
      if(this.state.filterBar == null)
        return true;
      else return data.name.toLowerCase().includes(this.state.filterBar);
    });

    return (
        <div>
          <Accessories
            getCommunityIcons={this.props.getCommunityIcons}
            />
          <div className="input-group ref-pane-filter-bar">
            <input
              className="form-control m-2"
              type="text"
              placeholder="Filter by name"
              onChange={(e) => this.setState({filterBar: e.target.value})}/>
          </div>
          {filteredIcons.length > 0 &&
            <table className='table table-bordered custom-icon-table'>
              <thead>
              <tr>
                <th className='th-icon'>Icon</th>
                <th className='th-name'>Name</th>
                <th className='th-url'>URL</th>
              </tr>
              </thead>
              <tbody>
              {filteredIcons.map( (s,i) => <IconRow key={i} row={s} /> )}
              </tbody>
            </table>}
          {filteredIcons.length === 0 && <NoFilteredResult />}

        </div>
    );
  }
}

export default CommunityIcons;
