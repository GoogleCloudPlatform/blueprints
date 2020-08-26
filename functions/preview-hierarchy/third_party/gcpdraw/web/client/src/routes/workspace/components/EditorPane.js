import React, {Component} from 'react';
import Editor from './Editor';
import {shortcutKeyPrefix} from '../../../helpers/shortcutKey';
import Diagram from "../../../models/Diagram";
import Tooltip from "../../../components/Tooltip";

const titleIconSet = {
  'private': ['lock', 'text-danger'],
  'unlisted': ['link', 'text-danger'],
  'public': ['unlock', 'text-primary'],
};

class DiagramTitle extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.iconRef = React.createRef();
    this.state = {
      tooltipActive: false,
      tooltipStyle: {}
    };
  }

  showTooltip = () => {
    if(!this.iconRef.current) { return; }
    const rect = this.iconRef.current.getBoundingClientRect();
    this.setState({
      tooltipActive: true,
      tooltipStyle: {
        left: rect.x - 10,
        top: rect.y - 40
      }
    });
  }

  getWidth() {
    return this.ref.current.clientWidth;
  }

  render() {
    const {diagram, paneWidth, openSaveWindow} = this.props;
    let iconSet, tooltip;
    if(diagram) {
      switch (diagram.permission) {
        case Diagram.PERMISSION.Unlisted.value:
          iconSet = titleIconSet['unlisted'];
          tooltip = Diagram.PERMISSION.Unlisted.description;
          break;
        case Diagram.PERMISSION.Public.value:
          iconSet = titleIconSet['public'];
          tooltip = Diagram.PERMISSION.Public.description;
          break;
        case Diagram.PERMISSION.Private.value:
        default:
          iconSet = titleIconSet['private'];
          tooltip = Diagram.PERMISSION.Private.description;
      }
    }

    return (
      <React.Fragment>
        <h1
          className='workspace-title'
          ref={this.ref}
          style={{maxWidth:paneWidth}}
          onClick={openSaveWindow}>
          {iconSet &&
          <i className={`mr-1 fas fa-${iconSet[0]} ${iconSet[1]}`}
             ref={this.iconRef}
             title={tooltip}
             onMouseOver={this.showTooltip}
             onMouseOut={() => this.setState({tooltipActive:false})}
          />}
          {diagram ? diagram.title : '(New Diagram)'}
          <Tooltip text={tooltip}
                   active={this.state.tooltipActive}
                   style={this.state.tooltipStyle} />
        </h1>
      </React.Fragment>
    );
  }
}

class EditorPane extends Component {
  constructor(props) {
    super(props);

    this.headerRef = React.createRef();
    this.titleRef = React.createRef();
    this.buttonRef = React.createRef();

    this.state = {
      buttonMode: 'standby',
      tooltipActive: false,
      tooltipStyle: {}
    };
  }

  // NOTE: Don't delete this until responsive header layout is tested
  // getTitlePaddingWidth = () => {
  //   let nodeStyle = window.getComputedStyle(this.titleRef.current);
  //   let paddingLeft = nodeStyle.getPropertyValue('padding-left');
  //   let paddingRight = nodeStyle.getPropertyValue('padding-right');
  //   return parseInt(paddingLeft) + parseInt(paddingRight);
  // }

  initializeStyle = () => {
    this.setState({
      buttonFullWidth: this.buttonRef.current.clientWidth
    }, this.updatePaneHeader);
  }

  updatePaneHeader = () => {
    const {paneWidth} = this.props;
    const {buttonFullWidth} = this.state;
    const titleW = this.titleRef.current.getWidth();

    this.setState({
      buttonMode: (titleW + buttonFullWidth > paneWidth) ? 'mini' : 'full',
      tooltipActive: false
    });
  }

  showButtonTooltip = () => {
    if(!this.buttonRef.current) { return; }
    const rect = this.buttonRef.current.getBoundingClientRect();
    this.setState({
      tooltipActive: true,
      tooltipStyle: {
        left: rect.x - 10,
        top: rect.y - 40
      }
    });
  }

  componentDidMount() {
    this.initializeStyle();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {paneWidth, workspace} = this.props;
    const {diagram} = workspace;
    const prevDiagram = prevProps.workspace ? prevProps.workspace.diagram : null;
    const currentTitle = diagram ? diagram.title : '';
    const prevTitle = prevDiagram ? prevDiagram.title : '';

    if(paneWidth !== prevProps.paneWidth
      || (currentTitle && prevTitle && currentTitle !== prevTitle)
    ) {
      this.updatePaneHeader();
    }
  }

  render() {
    const {draw, onCodeChange, forkedSourceId, workspace, paneWidth, openSaveWindow} = this.props;
    const {svg, code, submittedCode, drawing, diagram} = workspace;
    const {buttonMode, tooltipActive, tooltipStyle} = this.state;
    const shouldDraw = (code !== submittedCode);
    const drawButtonTheme = (drawing === false && shouldDraw === true)
      ? 'primary' : 'muted';
    const keyPrefix = shortcutKeyPrefix();
    return (
      <div className='gd-pane-fit'>
        <div className='pane-header for-editor'>
          <div className='editor-title-holder'
               ref={this.headerRef}
               style={{width:paneWidth}}>
            <DiagramTitle
              paneWidth={paneWidth}
              diagram={diagram}
              ref={this.titleRef}
              openSaveWindow={openSaveWindow} />
          </div>
          <div className='resizable-button-col'>
            <button
              type='button'
              ref={this.buttonRef}
              className={`btn pane-btn ${drawButtonTheme} ${buttonMode}`}
              onClick={() => {
                if(svg) {
                  draw(code, diagram, svg, forkedSourceId)
                }
              }}
              onMouseOver={drawing ? null : this.showButtonTooltip}
              onMouseOut={drawing ? null : () => {
                this.setState({tooltipActive: false})
              }}
              disabled={drawing}>
              <i className='pane-btn-icon fas fa-drafting-compass mr-1' />
              <span className='pane-btn-text'>
                  Draw & Save ({keyPrefix.keyName} + Enter)
                </span>
            </button>
            {!drawing && buttonMode === 'mini' &&
            <Tooltip text={`Draw & Save (${keyPrefix.keyName} + Enter)`}
                     active={tooltipActive}
                     style={tooltipStyle}
                     arrowStyle={{left:20}} />
            }

          </div>
        </div>
        <Editor
          code={code}
          draw={draw}
          drawing={drawing}
          onCodeChange={onCodeChange}
          diagram={diagram}
          svg={svg}
          forkedSourceId={forkedSourceId} />
      </div>
    )
  }
}

export default EditorPane;
