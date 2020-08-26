import React from 'react';
import examples from '../../../config/examples/';

const ExampleItem = (props) => (
  <div className='gd-example-item d-flex justify-content-between'>
    <div>{props.example.name}</div>
    <div>
      <button
        type='button'
        className='btn btn-secondary btn-xs'
        onClick={props.onClick.bind(this, props.example.id)}>Use This</button>
    </div>
  </div>
);

const Examples = (props) => (
  <div className='gd-examples'>
    {examples.map( (eg,i) =>
      <ExampleItem key={i} example={eg} onClick={props.onClick} /> )}
  </div>
);

export default Examples;
