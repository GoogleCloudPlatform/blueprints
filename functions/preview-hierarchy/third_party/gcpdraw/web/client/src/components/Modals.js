import React, {useRef} from 'react';
import classnames from 'classnames';
import useOutsideClick from '../hooks/useOutsideClick';
import useEtc from '../hooks/useEtc';


const ModalDialog = ({size, children, onClose, disabled}) => {
  const ref = useRef();

  useOutsideClick(ref, () => {
    if(!disabled && onClose) { onClose(); }
  });

  return <div ref={ref} className={classnames('modal-dialog', {
    'modal-xl': (size === 'xlarge'),
    'modal-lg': (size === 'large'),
    'modal-sm': (size === 'small')
  })}>
    <div className='modal-content'>
      {children}
    </div>
  </div>;
};

export const ModalWindow = ({children, size, onClose, disabled}) => {
  useEtc( () => {
    if(!disabled && onClose) { onClose(); }
  });

  return <div className='modal show' tabIndex='-1'>
    <ModalDialog
      disabled={disabled}
      onClose={onClose}
      size={size}>
      {children}
    </ModalDialog>
  </div>
};

export const ModalHeader = ({children, onClose, disabled}) => (
  <div className='modal-header'>
    <h5 className='modal-title'>
      {children}
    </h5>
    {onClose &&
      <button
        type='button'
        className='close'
        disabled={(disabled === true)}
        onClick={onClose}>
        <span>&times;</span>
      </button>}
  </div>
);

export const ModalBody = ({children, type}) => (
  <div className={classnames('modal-body', {
    'fit': (type === 'fit')
  })}>
    {children}
  </div>
);

export const ModalFooter = (props) => (
  <div className='modal-footer'>
    {props.children}
  </div>

);

export const ResultModal = ({title, body, footer}) => (
  <ModalWindow>
    <ModalHeader>{title}</ModalHeader>
    <ModalBody>{body}</ModalBody>
    <ModalFooter>{footer}</ModalFooter>
  </ModalWindow>
);
