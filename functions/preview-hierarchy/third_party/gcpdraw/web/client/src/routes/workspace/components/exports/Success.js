import React from 'react';
import {ModalWindow, ModalHeader,
    ModalBody, ModalFooter} from '../../../../components/Modals';


const Success = ({onClose, editUrl, previewUrl}) => (
  <ModalWindow>
    <ModalHeader onClose={onClose}>
      <img
        alt='google-slides'
        src='https://www.gstatic.com/images/branding/product/2x/slides_48dp.png'
        className='modal-header-icon'
        />
      Export to Google Slides
    </ModalHeader>
    <ModalBody>
      <h5 className='text-center text-success mb-3'>
        <i className='fas fa-check-circle mr-1' />
        Exported
      </h5>
      <a href={editUrl}
        target='_blank' rel='noopener noreferrer'>
        <img src={previewUrl} className='img-fluid exported-image'
        alt='exported slides preview' />
      </a>
    </ModalBody>
    <ModalFooter>
      <button type='button'
        className='btn btn-secondary'
        onClick={onClose}>Close</button>
        <a href={editUrl}
          className='btn btn-primary icon-translucent'
          target='_blank' rel='noopener noreferrer'>
          Open Slides
          <i className='fas fa-external-link-alt ml-2' />
        </a>
    </ModalFooter>
  </ModalWindow>
);

export default Success;
