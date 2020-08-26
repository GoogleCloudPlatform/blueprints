import React from 'react';
import {ModalWindow, ModalHeader,
    ModalBody, ModalFooter} from '../../../../components/Modals';
import {InModalError} from '../../../../components/Errors';

const Auth = ({authorizing, onClick, onCancel, error}) => (
  <ModalWindow onClose={onCancel} disabled={authorizing}>
    <ModalHeader onClose={onCancel} disabled={authorizing}>
      <img
        alt='google-signin'
        src='https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png'
        className='modal-header-icon'
        />
      Google Sign-In
    </ModalHeader>
    <ModalBody>
      <p>Sign in with Google to export to Google Slides.</p>
      <InModalError error={error} />
    </ModalBody>
    <ModalFooter>
      <button type='button'
        className='btn'
        disabled={authorizing}
        onClick={onCancel}>Cancel</button>
      <button type='button'
        className='btn btn-primary'
        disabled={authorizing}
        onClick={onClick}>
        {authorizing ? 'Authorizing...' : 'Authorize'}
      </button>
    </ModalFooter>
  </ModalWindow>
);

export default Auth;
