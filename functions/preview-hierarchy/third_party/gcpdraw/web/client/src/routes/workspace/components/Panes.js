import React, {Component} from 'react';
import SplitPane from 'react-split-pane';
import EditorPane from './EditorPane';
import PreviewPane from './PreviewPane';
// import AccessoryPane from './AccessoryPane';
import RefPane from './RefPane';
import RevisionsPane from "./RevisionsPane";

const getDefaultPaneH = () => {
  const winH = window.innerHeight;
  if(winH > 1200) {
    return 400;
  }
  else if(winH > 800) {
    return 300;
  }
  else {
    return 200;
  }
}

class Panes extends Component {
  constructor(props) {
    super(props);
    this.editorPaneRef = React.createRef();
    this.state = {leftPaneWidth: 510};
  }

  render() {
    const {draw, workspace,
      openExportWindow, onCodeChange, onExampleSelected, saving,
      getCommunityIcons, communityIcons, forkedSourceId,
      openSaveWindow, openDeleteWindow, onPreviewRevision, onRevisionTabClick} = this.props;
    const {code, submittedCode, drawing, revisionTabActive} = workspace;
    const hasPendingChanges = drawing === false && (code !== submittedCode);
    const {leftPaneWidth} = this.state;
    // Correspond to $pane-navbar-height for "closed" state
    const revTabHeight = revisionTabActive ? getDefaultPaneH() : 30

    return (
      <div className='workspace'>
        <SplitPane
          split='vertical'
          minSize={400}
          maxSize={800}
          defaultSize={leftPaneWidth}
          onChange={(size) => { this.setState({leftPaneWidth:size}); } }
          primary='first'>
          <SplitPane
            split='horizontal'
            defaultSize={getDefaultPaneH()}
            primary='second'>
            <EditorPane
              ref={this.editorPaneRef}
              workspace={workspace}
              paneWidth={leftPaneWidth}
              draw={draw}
              onCodeChange={onCodeChange}
              forkedSourceId={forkedSourceId}
              openSaveWindow={openSaveWindow} />
            <RefPane
              getCommunityIcons={getCommunityIcons}
              onCodeChange={onCodeChange}
              communityIcons={communityIcons}
              onExampleSelected={onExampleSelected} />
          </SplitPane>
          <SplitPane
            split='horizontal'
            defaultSize={revTabHeight}
            allowResize={false}
            primary='second'>
            <PreviewPane
              workspace={workspace}
              saving={saving}
              openExportWindow={openExportWindow}
              openSaveWindow={openSaveWindow}
              openDeleteWindow={openDeleteWindow} />
            <RevisionsPane
              onResizerClick={() => {onRevisionTabClick()}}
              hasPendingChanges={hasPendingChanges}
              workspace={workspace}
              onPreviewRevision={onPreviewRevision}
              isRevisionTabActive={revisionTabActive} />
          </SplitPane>
        </SplitPane>
      </div>
    )
  }
}

export default Panes;
