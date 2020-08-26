import '../index.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Controlled as CodeMirror} from 'react-codemirror2';
import {MODE_GCPDRAW} from '../../../config/codemirror';
import {PageTitleBar, PageTitle} from '../../../components/Layout';
import DiagramSvg from '../../../components/DiagramSvg';
import Googler from '../../../components/Googler';


const Permalink = ({permalink}) => (
  <div className='permalink'>
    <div className='input-group'>
      <div className='input-group-prepend'>
        <span className='input-group-text' id=''>Permalink</span>
      </div>
      <input
        type='text'
        readOnly={true}
        className='form-control permalink-input'
        value={permalink} />
      <div className='input-group-append'>
        <CopyToClipboard text={permalink}>
          <button type='button' className='btn btn-cb'>
            <i className='fas fa-copy' />
          </button>
        </CopyToClipboard>
      </div>
    </div>
  </div>
);


const TitleBar = ({diagram, initCopyWithinWorkspace}) => {
  const itemClass = 'list-inline-item text-muted';
  return <PageTitleBar hasSubtitle={true}>
    <div className='d-flex justify-content-between'>
      <div>
        <PageTitle>{diagram.title}</PageTitle>
      </div>
      <div>
          <Link
            to={diagram.clientForkPath}
            onClick={initCopyWithinWorkspace}
            className='btn btn-secondary'>Copy</Link>
      </div>
    </div>
    <div className='d-flex align-items-center justify-content-between'>
      <div>
        <ul className='list-inline mb-0'>
          <li className={itemClass}><Googler username={diagram.ownername} /></li>
          <li className={itemClass}>
            <i className='fas fa-clock mr-1' />{diagram.prettyUpdatedAt}
          </li>
          <li className={itemClass}>
            <i className={`fas fa-${diagram.permissionIcon} mr-1`} />
            {diagram.permissionText}
          </li>
        </ul>
      </div>
      <Permalink permalink={window.location.href} />
    </div>
  </PageTitleBar>;
};


class Preview extends DiagramSvg {};
Preview.defaultProps = {
  className: 'diagram-preview',
  isSVGManaged: false,
};


const Code = ({diagram}) => (
  <CodeMirror
    value={diagram.code}
    defineMode={MODE_GCPDRAW}
    className='code-preview'
    readOnly={true}
    options={{
      mode: 'gcpdraw',
      theme: 'material',
      lineNumbers: true
    }}
  />
);


export const Main = ({diagram, workspace, initCopyWithinWorkspace}) => (
  <React.Fragment>
    <TitleBar diagram={diagram} initCopyWithinWorkspace={initCopyWithinWorkspace} />
    <div className='row'>
      <div className='col-sm-4 col-xl-3'>
        <Code diagram={diagram} />
      </div>
      <div className='col-sm-8 col-xl-9'>
        <Preview workspace={workspace} diagram={diagram} />
      </div>
    </div>
  </React.Fragment>
);
