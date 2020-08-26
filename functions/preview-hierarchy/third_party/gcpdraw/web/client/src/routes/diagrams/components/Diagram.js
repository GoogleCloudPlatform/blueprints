import React from 'react';
import {Link} from 'react-router-dom';
import Googler from '../../../components/Googler';

const DiagramItem = ({diagram}) => (
  <div className='diagram-item'>
    <div className='d-flex'>
      <div className='item-svg'>
        <div dangerouslySetInnerHTML={{__html:diagram.svg}} />
      </div>
      <div className='item-info'>
        <h4>{diagram.title}</h4>
        <Googler username={diagram.ownername} />
        <div>{diagram.prettyUpdatedAt}</div>
        <div>{diagram.permissionText}</div>
        <div>
          {diagram.canEdit &&
            <Link to={diagram.clientPath}
              className='btn-sm btn-primary mr-1'>Edit</Link>}
          <Link to={diagram.clientForkPath}
            className='btn-sm btn-secondary mr-1'>Fork</Link>
          <Link to={diagram.clientPath}
            className='btn-sm btn-secondary'>Detail</Link>
        </div>
      </div>
    </div>
  </div>
);

export const DiagramCollection = ({diagrams}) => {
  if(diagrams.length === 0) {
    return <div>No Diagram</div>;
  }
  return <div className='diagram-list'>
    {diagrams.map( (diagram, i) => {
      return <DiagramItem diagram={diagram} key={i} />
    })}
  </div>
};
