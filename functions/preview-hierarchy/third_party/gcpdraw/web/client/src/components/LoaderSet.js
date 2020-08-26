import React from 'react';


const Loader = (props) => (
  <div className='text-center mt-5'>
    <div className='spinner-border text-primary'>
      <span className='sr-only'>Loading...</span>
    </div>
  </div>
);


const LoadError = ({text}) => (
  <div className='mt-5 text-center text-danger'>
    {text}
  </div>
);


const LoaderSet = ({loading, loadError}) => (
  <React.Fragment>
    {loading === true && <Loader />}
    {loadError && <LoadError text={loadError} />}
  </React.Fragment>
);

export default LoaderSet;
