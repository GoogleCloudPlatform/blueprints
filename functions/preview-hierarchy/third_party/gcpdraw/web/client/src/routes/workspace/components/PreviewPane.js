import React, {useState} from 'react';
import {formatTime} from '../../../helpers/util';
import {DropdownMenu, DropdownItem,
  DropdownDivider} from '../../../components/Dropdown';

const DrawGuide = () => (
  <div className='gd-preview-guide'>
    <div className='gd-preview-guide-text'>Your diagram appears here</div>
  </div>
);

const Drawing = () => (
  <div className='gd-preview-guide'>
    <div className='gd-preview-guide-text'>
      <span
        className='spinner-border spinner-border-sm text-light' />
      &nbsp;
      <span>Drawing...</span>
    </div>
  </div>
);

const PreviewPlaceholder = (props) => (
  <div className='gd-preview-holder empty'>
    <img
      alt='preview-sample'
      src='/static/img/preview-placeholder.png'
      className='preview-image' />
  </div>
);


const Preview = ({svg}) => (
  <div dangerouslySetInnerHTML={{__html:svg}} className='gd-preview-holder' />
);


const DownloadSVGButton = ({svg, diagram}) => {
  const filename = diagram && diagram.title ? diagram.title : 'gcpdraw';
  return (
      <a
          href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`}
          download={`${filename}.svg`} className='btn pane-btn muted'>
        <i className='fas fa-download mr-1' />Download
      </a>
  )
};

const ExportSlideButton = ({openExportWindow}) => {
  return (
    <button
        type='button'
        onClick={openExportWindow}
        className='btn pane-btn muted'>
      <i className='fas fa-file-export mr-1' />Export to Google Slides
    </button>
  )
};

const SettingsDropdownButton = ({saving, openSaveWindow, openDeleteWindow}) => {
  const [dropdownVisible, toggleDropdown] = useState(false);
  return (
    <React.Fragment>
      <button
          type='button'
          className='btn pane-btn muted dropdown-toggle'
          disabled={saving}
          onClick={() => toggleDropdown(true)}>
        <i className='fas fa-cog mr-1' />
        Settings
      </button>
      <DropdownMenu
          active={dropdownVisible}
          onClose={() => toggleDropdown(false)}>
        <DropdownItem onClick={openSaveWindow}>Update Title/Privacy</DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={openDeleteWindow}>Delete Diagram</DropdownItem>
      </DropdownMenu>
    </React.Fragment>
  )
};


export const PreviewPane = (
    {workspace: {svg, drawing, drewAt, diagram}, saving, openExportWindow,
    openSaveWindow, openDeleteWindow}) => {
  return (
    <div className='gd-pane-fit white'>
      <div className='pane-header d-flex justify-content-between'>
        <div>
          {drewAt &&
            <span className='ml-2 sub-text'>
              Updated at {formatTime(drewAt)}
            </span>}
        </div>
        {svg && <div className="dropdown show">
          <DownloadSVGButton svg={svg} diagram={diagram}/>
          <ExportSlideButton openExportWindow={openExportWindow}/>
          {diagram &&
            <SettingsDropdownButton
              saving={saving}
              openSaveWindow={openSaveWindow}
              openDeleteWindow={openDeleteWindow}/> }
        </div> }
      </div>
      {!svg && <PreviewPlaceholder drawing={drawing} /> }
      {!drawing && !svg && <DrawGuide /> }
      {drawing && <Drawing /> }
      {svg && <Preview svg={svg} /> }
    </div>
  );
};

export default PreviewPane;
