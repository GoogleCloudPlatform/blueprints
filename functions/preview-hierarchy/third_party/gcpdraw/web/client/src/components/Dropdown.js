import React, {useRef} from 'react';
import classnames from 'classnames';
import useOutsideClick from '../hooks/useOutsideClick';


export const DropdownMenu = ({active, onClose, children}) => {
  const ref = useRef();
  useOutsideClick(ref, () => {
    if(active === true && onClose) { onClose(); }
  });

  const className = classnames('dropdown-menu dropdown-menu-right', {
    'show': (active === true)
  });
  return <div ref={ref} className={className}>
    {children}
  </div>
};


export const DropdownItem = ({onClick, children}) => (
  <button
    onClick={onClick}
    className='dropdown-item no-shadow'>
    {children}
  </button>
);


export const DropdownDivider = () => (
  <div className='dropdown-divider' />
);
