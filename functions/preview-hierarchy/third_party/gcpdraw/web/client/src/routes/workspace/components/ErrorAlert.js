import React from 'react';

const ErrorAlert = (props) => {
  if(!props.error) { return <div />; }
  return (
    <div className='alert alert-danger text-center gd-alert'>
      {props.error}
      <button type='button' className='close' onClick={props.onClick}>
          <span aria-hidden='true'>&times;</span>
        </button>
    </div>
  );
};

export default ErrorAlert;
