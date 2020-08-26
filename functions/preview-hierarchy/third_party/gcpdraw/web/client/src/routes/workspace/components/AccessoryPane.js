import React from 'react';

const Placeholder = (props) => (
  <div className='d-flex justify-content-center align-items-center"'>
    <div className='text-secondary text-center'>
      <span className='accessory-placeholder'>
        Click 'Draw' button, then a server draws a diagram for you.
      </span>
    </div>
  </div>
);

// const Logs = (props) => (
//   <div className='gd-pane-content p-3'>
//     <span className='text-secondary font-weight-bold'>Exported to:</span>
//     <img
//       className='gd-slides-icon'
//       alt='Slides Icon'
//       src='https://www.gstatic.com/images/branding/product/2x/slides_48dp.png' />
//     <a href={props.editUrl} target='_blank' rel='noopener noreferrer'>
//       {props.title}
//     </a>
//     <div>
//       {props.logs.map((log, i) =>
//           <div key={i} className='text-secondary'>{log}</div>)}
//     </div>
//   </div>
// );

const Logs = ({logs}) => (
  <div className='gd-pane-content p-3'>
    {logs.map((log, i) =>
        <div key={i} className='text-secondary'>{log}</div>)}
  </div>
);

const AccessoryPane = (props) => {
  const {svg, logs} = props.workspace;

  return (
    <div className='gd-pane-fit'>
      <div className='pane-header'>Output</div>
      {!svg && <Placeholder />}
      {svg && <Logs logs={logs} />}
    </div>
  );
}

export default AccessoryPane;
