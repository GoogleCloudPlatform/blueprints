import './collection.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import Googler from '../../../components/Googler';
import DiagramSvg from '../../../components/DiagramSvg';


class DiagramPreview extends DiagramSvg {};
DiagramPreview.defaultProps = {
  className: 'item-svg-root',
  svgHolderClassName: 'item-svg',
  isSVGManaged: true,
};


const DiagramItem = ({diagram, push}) => (
  <div className='diagram-outer col-sm-6 col-lg-4 col-xl-3'>
    <div className='diagram-item'>
      <DiagramPreview
        diagram={diagram}
        onClick={()=>push(diagram.clientPath)} />
      <div className='item-info'>
        <div className='d-flex justify-content-between align-items-center mb-2'>
          <h5 className='mb-0'>
            <Link to={diagram.clientPath}
              className='diagram-title'>{diagram.title}</Link>
          </h5>
          <div>
            {diagram.canEdit &&
              <Link to={diagram.clientPath}
                className='btn-sm btn-primary mr-1'>Edit</Link>}
              <Link to={diagram.clientForkPath}
                className='btn-sm btn-secondary'>Copy</Link>
          </div>
        </div>
        <Googler username={diagram.ownername} />
        <ul className='list-inline text-muted small mt-2 mb-0'>
          <li className='list-inline-item'>
            <i className='fas fa-clock mr-1' />
            {diagram.prettyUpdatedAt}
          </li>
          <li className='list-inline-item'>
            <i className={`mr-1 fas fa-${diagram.permissionIcon}`} />
            {diagram.permissionText}
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export const DiagramCollection = ({diagrams, push}) => {
  if(!diagrams || diagrams.length === 0) {
    return <div className='guide-no-content'>No diagram yet.</div>;
  }
  return <div className='diagram-list row'>
    {diagrams.map( (diagram, i) => {
      return <DiagramItem diagram={diagram} push={push} key={i} />
    })}
  </div>
};
