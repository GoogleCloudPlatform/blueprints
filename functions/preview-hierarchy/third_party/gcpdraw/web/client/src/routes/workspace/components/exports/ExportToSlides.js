import React, {Component} from 'react';
import classnames from 'classnames';
import {ModalWindow, ModalHeader,
    ModalBody, ModalFooter} from '../../../../components/Modals';
import {InModalError} from '../../../../components/Errors';

const Header = ({onCancel, exporting}) => (
  <ModalHeader onClose={onCancel} disabled={exporting}>
    <img
      alt='google-slides'
      src='https://www.gstatic.com/images/branding/product/2x/slides_48dp.png'
      className='modal-header-icon'
      />
    Export to Google Slides
  </ModalHeader>
);

const FormRowContent = ({label, children, fit}) => (
  <div className='row form-group'>
    <label className={classnames('col-3 col-form-label', {
      'pt-0': fit === true
    })}>{label}</label>
    <div className='col-9'>{children}</div>
  </div>
);

const TARGET_OPTIONS = [
  {label: 'New File', value: 'newSlides'},
  {label: 'Existing File', value: 'existingSlides'}
]

const Option = ({label, value, checked, onChange}) => (
  <div className='form-check form-check-inline'>
    <input className='form-check-input' type='radio' name='target'
      id={value}
      value={value}
      onChange={onChange}
      checked={checked} />
    <label className='form-check-label' htmlFor={value}>
      {label}
    </label>
  </div>
);

class ExportToSlides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideUrl: !!props.editUrl ? props.editUrl : '',
      selectedOption: !!props.editUrl
        ? TARGET_OPTIONS[1].value
        : TARGET_OPTIONS[0].value
    };
  }

  handleOptionSelect = (e) => {
    this.setState({selectedOption: e.currentTarget.value});
  }

  handleSlideUrlChange = (e) => {
    this.setState({slideUrl: e.currentTarget.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.exportToSlides(this.props.code, this.state.slideUrl);
  }

  render() {
    const {onCancel, exporting, error} = this.props;

    return (
      <ModalWindow onClose={onCancel} disabled={exporting}>
        <Header onCancel={onCancel} exporting={exporting} />
        <form className='export-form' onSubmit={this.handleSubmit}>
          <ModalBody>
            <FormRowContent label='Destination:' fit={true}>
              {TARGET_OPTIONS.map( (option, index) =>
                <Option key={index}
                  label={option.label}
                  onChange={this.handleOptionSelect}
                  value={option.value}
                  checked={(option.value === this.state.selectedOption)} />
                )}
            </FormRowContent>
            {this.state.selectedOption === 'existingSlides' &&
              <FormRowContent label='Slides URL:'>
                <input
                  type='url'
                  className='form-control'
                  autoFocus={true}
                  required={true}
                  value={this.state.slideUrl}
                  onChange={this.handleSlideUrlChange}
                  placeholder='Your Slides File URL' />
                <small className='text-muted'>
                  A diagram will be added at the end.
                </small>
              </FormRowContent>}
              <span className='text-danger'>WARNING: Custom Icons (including Community Icons) are not exported to Google Slides.</span>
            <InModalError error={error} />
          </ModalBody>
          <ModalFooter>
            <button type='button'
              className='btn'
              disabled={exporting}
              onClick={onCancel}>Cancel</button>
            <button type='submit'
              className='btn btn-primary'
              disabled={exporting}>
              {exporting ? 'Exporting...' : 'Export'}
            </button>
          </ModalFooter>
        </form>
      </ModalWindow>
    );
  }
}

export default ExportToSlides;
