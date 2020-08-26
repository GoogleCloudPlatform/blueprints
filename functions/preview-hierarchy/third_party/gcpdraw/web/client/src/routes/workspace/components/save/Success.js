import React from 'react';
import {ModalWindow, ModalHeader,
    ModalBody, ModalFooter} from '../../../../components/Modals';


const Success = ({onClose}) => (
  <ModalWindow>
    <ModalHeader onClose={onClose}>
      Save Diagram
    </ModalHeader>
    <ModalBody>
      <h5 className='text-center text-success mb-3'>
        <i className='fas fa-check-circle mr-1' />
        Saved
      </h5>
    </ModalBody>
    <ModalFooter>
      <button type='button'
        className='btn btn-secondary'
        onClick={onClose}>Close</button>
    </ModalFooter>
  </ModalWindow>
);

export default Success;
