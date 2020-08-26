import React from "react";
import DiagramSvg from "../../../components/DiagramSvg";
import LoaderSet from "../../../components/LoaderSet";

// RevisionPreview simply reuse existing logic on DiagramSvg
// Using locally managed state for SVG (without filter) as we
// need to re-render on larger preview (with filter) when
// the user clicked on a revision anyway.
class RevisionPreview extends DiagramSvg{}
RevisionPreview.defaultProps = {
  className: 'rev-svg-root',
  svgHolderClassName: 'rev-svg',
  isSVGManaged: true,
}

const RevisionItem = ({code, revisionAt, onClick}) => {
  return (
    <div className='rev-item'>
      <RevisionPreview onClick={onClick} diagram={{code: code}}/>
      <span className='rev-time'>Revised at: {revisionAt}</span>
    </div>
  )
}

const RevisionPlaceholder = () => {
  return (
    <React.Fragment>
      <div className='gd-preview-holder empty'>
        <img
          alt='preview-sample'
          src='/static/img/revision-placeholder.png'
          className='preview-image' />
      </div>
      <div className='gd-preview-guide'>
        <div className='gd-preview-guide-text'>Your revisions appear here</div>
      </div>
    </React.Fragment>
  )
}

const RevisionsPane = ({onResizerClick, onPreviewRevision, hasPendingChanges, isRevisionTabActive,
                         workspace: {loadingRevisions, revisions, revisionError}}) => {
  function revisionClick(code) {
    if(hasPendingChanges) {
      alert('There are pending changes, please save it first');
      return
    }
    onPreviewRevision(code);
  }
  const btnDirection = isRevisionTabActive ? 'down' : 'up'
  return (
    <div className='gd-pane-fit white'>
      <div className='pane-header rev-pane-header d-flex justify-content-between' onClick={onResizerClick}>
        Revisions
        <i className={"fas fa-angle-double-" + btnDirection + " btn pane-btn"}/>
      </div>
      <LoaderSet loading={loadingRevisions} loadError={revisionError}/>
      {!loadingRevisions && revisionError === null && revisions.length === 0 &&
        <RevisionPlaceholder/>
      }
      {!loadingRevisions && revisionError === null &&
        <div className='rev-list'>
          {revisions.map((rev) => {
            return <RevisionItem
              onClick={() => revisionClick(rev.code)}
              code={rev.code} revisionAt={rev.revisionAt} key={rev.revisionId} />
          })}
        </div>
      }
    </div>
  )
}

export default RevisionsPane;