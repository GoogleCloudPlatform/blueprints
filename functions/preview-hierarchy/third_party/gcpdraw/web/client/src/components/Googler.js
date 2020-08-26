import React from 'react';

const Googler = ({username}) => (
  <React.Fragment>
    <img
      className='user-photo mr-1'
      alt={username}
      src={`https://teams-service.googleplex.com/photos/${username}`} />
    <a href={`https://moma.corp.google.com/person/${username}`}
      target='_blank' rel='noopener noreferrer'>
      {username}
    </a>
  </React.Fragment>
);

export default Googler;
