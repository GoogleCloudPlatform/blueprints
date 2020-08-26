import React from 'react';

export const InModalError = props => {
  if(!props.error) { return <div />; }
  return <div className='alert alert-danger'>{props.error}</div>;
};
