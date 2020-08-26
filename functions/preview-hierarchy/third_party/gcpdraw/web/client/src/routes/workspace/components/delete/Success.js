import React from 'react';
import {Link} from 'react-router-dom';
import {ModalWindow, ModalHeader,
    ModalBody, ModalFooter} from '../../../../components/Modals';


const Success = ({onClose}) => (
  <ModalWindow>
    <ModalHeader>
      <i className='fas fa-remove mr-2 text-danger' />
      Delete Diagram
    </ModalHeader>
    <ModalBody>
      <h5 className='text-center text-success mb-3'>
        <i className='fas fa-check-circle mr-1' />
        Deleted
      </h5>
    </ModalBody>
    <ModalFooter>
      <Link to='/mydiagrams'
        className='btn btn-primary mr-1'>My Diagrams</Link>
    </ModalFooter>
  </ModalWindow>
);

export default Success;
