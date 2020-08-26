import React from 'react';
import _ from 'underscore';
import classnames from 'classnames';


const Tooltip = ({active, text, children, onClose, size,
  style, arrowStyle}) => {
  const classNames = classnames('tooltip bs-tooltip-top sg-tooltip-top', {
    'd-none': active === false
  });

  const _style = _.extend({}, style);
  const _arrowStyle = _.extend({}, arrowStyle);

  return (
    <div className={classNames} style={_style} role='tooltip'>
      <div className='arrow' style={_arrowStyle}></div>
      <div className='tooltip-inner'>
        {text}
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
