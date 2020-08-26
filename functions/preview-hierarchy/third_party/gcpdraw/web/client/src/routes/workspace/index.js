import './index.scss';
import './resizer.scss';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router';
import queryString from 'query-string';
import {initializeData, initWorkspace, draw,
  onCodeChange, onExampleSelected, initCopyWithinWorkspace,
  onErrorReset, onPreviewRevision, onRevisionTabClick} from './actions/workspaceActions';
import {openExportWindow, closeExportWindow,
  authCheck, authorize, exportToSlides} from './actions/exportActions';
import {openSaveWindow, closeSaveWindow,
  saveDiagram} from './actions/saveActions';
import {openDeleteWindow, closeDeleteWindow,
  deleteDiagram} from './actions/deleteActions';
import {getCommunityIcons} from './actions/communityIconsActions';
import App from '../../App';
import Panes from './components/Panes';
import ErrorAlert from './components/ErrorAlert';
import ExportWindow from './components/exports/ExportWindow';
import SaveWindow from './components/save/SaveWindow';
import DeleteWindow from './components/delete/DeleteWindow';
import {Main as ViewOnlyContainer} from '../diagram/components/Main';
import LoaderSet from "../../components/LoaderSet";


class Container extends Component {
  constructor(props) {
    super(props);
    if(!props.workspace.initialized) {
      const {srcId} = queryString.parse(this.props.location.search);
      props.initWorkspace(props.match.params.id, srcId, props.workspace.code);
      props.authCheck();
    }
  }

  componentDidUpdate() {
    const {pathname, saver, workspace, push} = this.props;
    if(pathname === '/diagrams/new'
      && saver.saved === true
      && workspace.diagram
      ) {
      push(workspace.diagram.clientPath);
    }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.beforeunload.bind(this));
  }

  componentWillUnmount() {
    this.props.initializeData();
    window.removeEventListener('beforeunload', this.beforeunload.bind(this));
  }

  beforeunload(e) {
    const {drawing, code, submittedCode} = this.props.workspace;
    const {saving} = this.props.saver;
    const {deleting} = this.props.deleter;
    if ((code !== submittedCode) || drawing || saving || deleting) {
      e.preventDefault();
      e.returnValue = true;
    }
  }

  render() {
    const {draw, onCodeChange, onExampleSelected, onErrorReset,
      workspace, exporter, saver, deleter, pathname,
      openExportWindow, openSaveWindow,
      openDeleteWindow, getCommunityIcons,
      communityIcons, initCopyWithinWorkspace, onPreviewRevision,
      onRevisionTabClick} = this.props;
    const {loading, initialized, error, diagram, loadError, viewOnlyDiagram} = workspace;
    const {isExportWindowOpen} = exporter;
    const {isSaveWindowOpen, saving} = saver;
    const {isDeleteWindowOpen} = deleter;
    const forkedSourceId = new URLSearchParams(this.props.location.search).get('srcId');
    const isNewDiagram = pathname === '/diagrams/new';
    let isOwner = false;
    if(initialized === true) {
      if (viewOnlyDiagram && !diagram) {    // View only page.
        document.title = viewOnlyDiagram.title
        isOwner = viewOnlyDiagram.ownername === window.currentUsername;
      } else {
        document.title = diagram ? diagram.title : 'New Diagram';
        isOwner = diagram !== null && diagram.ownername === window.currentUsername;
      }
    }

    return (
      <App>
        <div className='notification-outer'>
          <ErrorAlert error={error} onClick={onErrorReset} />
        </div>

        {(loading === true || loadError !== null) &&
          <LoaderSet loading={loading} loadError={loadError} />
        }

        {initialized === true && !isNewDiagram && !isOwner && viewOnlyDiagram && !diagram &&
          <div className='container-fluid'>
            <ViewOnlyContainer
              diagram={viewOnlyDiagram}
              workspace={workspace}
              initCopyWithinWorkspace={initCopyWithinWorkspace} />
          </div>
        }

        {initialized === true && (isNewDiagram || isOwner) &&
          <Panes
            draw={draw}
            isNewDiagram={isNewDiagram}
            onCodeChange={onCodeChange}
            onExampleSelected={onExampleSelected}
            openExportWindow={openExportWindow}
            openSaveWindow={openSaveWindow}
            openDeleteWindow={openDeleteWindow}
            saving={saving}
            getCommunityIcons={getCommunityIcons}
            communityIcons={communityIcons}
            workspace={workspace}
            forkedSourceId={forkedSourceId}
            onPreviewRevision={onPreviewRevision}
            onRevisionTabClick={onRevisionTabClick}
          />}

        {isExportWindowOpen === true &&
          <ExportWindow {...this.props} />}

        {isSaveWindowOpen === true &&
          <SaveWindow {...this.props}
            isNew={isNewDiagram}/>}

        {isDeleteWindowOpen === true &&
          <DeleteWindow {...this.props} />}
      </App>
    );
  }
}


const mapStateToProps = state => ({
  workspace: state.workspace,
  exporter: state.exporter,
  saver: state.saver,
  deleter: state.deleter,
  pathname: state.router.location.pathname,
  communityIcons: state.communityIcons
});

const mapDispatchToProps = dispatch => {
  return {
    initWorkspace: bindActionCreators(initWorkspace, dispatch),
    draw: bindActionCreators(draw, dispatch),
    onCodeChange: bindActionCreators(onCodeChange, dispatch),
    onExampleSelected: bindActionCreators(onExampleSelected, dispatch),
    onErrorReset: bindActionCreators(onErrorReset, dispatch),
    openExportWindow: bindActionCreators(openExportWindow, dispatch),
    closeExportWindow: bindActionCreators(closeExportWindow, dispatch),
    authCheck: bindActionCreators(authCheck, dispatch),
    authorize: bindActionCreators(authorize, dispatch),
    exportToSlides: bindActionCreators(exportToSlides, dispatch),
    openSaveWindow: bindActionCreators(openSaveWindow, dispatch),
    closeSaveWindow: bindActionCreators(closeSaveWindow, dispatch),
    saveDiagram: bindActionCreators(saveDiagram, dispatch),
    openDeleteWindow: bindActionCreators(openDeleteWindow, dispatch),
    closeDeleteWindow: bindActionCreators(closeDeleteWindow, dispatch),
    deleteDiagram: bindActionCreators(deleteDiagram, dispatch),
    initializeData: bindActionCreators(initializeData, dispatch),
    push: bindActionCreators(push, dispatch),
    getCommunityIcons: bindActionCreators(getCommunityIcons, dispatch),
    initCopyWithinWorkspace: bindActionCreators(initCopyWithinWorkspace, dispatch),
    onPreviewRevision: bindActionCreators(onPreviewRevision, dispatch),
    onRevisionTabClick: bindActionCreators(onRevisionTabClick, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
