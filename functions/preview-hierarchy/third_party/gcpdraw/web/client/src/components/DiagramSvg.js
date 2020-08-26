import React, {Component} from 'react';
import DrawApi from '../apis/DrawApi';

class DiagramSvg extends Component {
  constructor(props) {
    super(props);
    this.state = {svg: null, error: null};
  }

  updateSvg = (svg) => {
    this.setState({svg});
  }

  updateError = (error) => {
    console.error(error);
    let msg = error.message;
    try {
      if(error.response.status === 400
        || error.response.status === 403
        || error.response.status === 404) {
        msg = error.response.data.error;
      }
    } catch (e) {
      console.error(e);
    }
    this.setState({msg});
  }

  componentDidMount() {
    const {updateSvg, updateError} = this;
    if (!this.props.isSVGManaged) {
      return
    }
    DrawApi.svg(this.props.diagram.code)
      .then(res => {
        updateSvg(res.data.svg);
      }).catch(error => {
        updateError(error);
      });
  }

  renderLoading() {
    return <div className='diagram-svg-loader d-flex align-items-center justify-content-center'>
      <div className='spinner-border' />
    </div>;
  }

  renderError() {
    return <div className='diagram-svg-loader d-flex align-items-center justify-content-center'>
      <i className='fas fa-exclamation-triangle text-danger' />
    </div>;
  }

  renderSvg(svg) {
    return <div className={this.props.svgHolderClassName}
      dangerouslySetInnerHTML={{__html: svg}} />;
  }

  ui(onClick, svg, error) {
    return (
      <div className={this.props.className} onClick={onClick}>
        {!svg && !error && this.renderLoading() }
        {!svg && error && this.renderError() }
        {svg && this.renderSvg(svg) }
      </div>
    )
  }

  render() {
    const {onClick, isSVGManaged} = this.props;
    let {svg, error} = this.state;
    if (!isSVGManaged) {
      svg = this.props.workspace.svg;
      error = this.props.workspace.error;
    }
    return this.ui(onClick, svg, error);
  }
}

DiagramSvg.defaultProps = {
  className: '',
  svgHolderClassName: '',
  // if SVG state should be managed locally
  //   true: component will make request to render based on code, expect `Diagram` to be passed in props.
  //   false: caller will make request to render, assume caller will pass `workspace` in prop
  isSVGManaged: true,
};


export default DiagramSvg;
