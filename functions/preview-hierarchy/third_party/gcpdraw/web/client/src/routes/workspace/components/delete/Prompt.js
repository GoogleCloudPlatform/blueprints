import React from 'react';
import {ModalWindow, ModalHeader,
    ModalBody, ModalFooter} from '../../../../components/Modals';
import {InModalError} from '../../../../components/Errors';

const Prompt = ({onSubmit, onCancel, deleting, error}) => (
  <ModalWindow onClose={onCancel} disabled={deleting}>
    <ModalHeader onClose={onCancel} disabled={deleting}>
      <i className='fas fa-remove mr-2 text-danger' />
      Delete Diagram
    </ModalHeader>
    <ModalBody>
      <p>Are you sure to delete this diagram?</p>
      <InModalError error={error} />
    </ModalBody>
    <ModalFooter>
      <button type='button'
        className='btn'
        disabled={deleting}
        onClick={onCancel}>Cancel</button>
      <button type='button'
        onClick={onSubmit}
        className='btn btn-danger'
        disabled={deleting}>
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
    </ModalFooter>
  </ModalWindow>
);

export default Prompt;
