import React, {Component} from 'react';
import classnames from 'classnames';
import {ModalWindow, ModalHeader,
    ModalBody, ModalFooter} from '../../../../components/Modals';
import {InModalError} from '../../../../components/Errors';
import Diagram from '../../../../models/Diagram';


const Header = ({isNew, onCancel, saving}) => (
  <ModalHeader onClose={onCancel} disabled={saving}>
    {!isNew && <React.Fragment>
      <i className='fas fa-cog mr-2 text-muted' />
      Update Settings
      </React.Fragment>
    }
    {isNew && <React.Fragment>
      <i className='fas fa-save mr-2 text-muted' />
      Save Diagram
    </React.Fragment>}
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

const {Private, Unlisted, Public} = Diagram.PERMISSION;
const PERMISSION_OPTIONS = [
  {label: Private.description, value: Private.value},
  {label: Unlisted.description, value: Unlisted.value},
  {label: Public.description, value: Public.value}
];


const Option = ({name, label, value, checked, onChange}) => (
  <div className='form-check form-check-inline'>
    <input className='form-check-input' type='radio'
      name={name}
      id={value}
      value={value}
      onChange={onChange}
      checked={checked} />
    <label className='form-check-label' htmlFor={value}>
      {label}
    </label>
  </div>
);


class SaveForm extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();

    const {diagram} = this.props;
    this.state = {
      title: (diagram ? diagram.title : ''),
      permission: (diagram ? diagram.permission : Diagram.PERMISSION.Private.value)
    };
  }

  handleTitleChange = (e) => {
    this.setState({title: e.currentTarget.value});
  }

  handlePermissionSelect = (e) => {
    this.setState({permission: e.currentTarget.value});
  }

  validate = () => {
    return this.form.current.reportValidity();
  }

  handleSubmit = (e) => {
    // console.log('handleSubmit');
    e.preventDefault();
    if (this.validate()) {
      this.props.submit({
        diagram: this.props.diagram,
        code: this.props.code,
        title: this.state.title,
        diagramPermission: this.state.permission,
      });
    }
    // this.props.exportToSlides(this.props.code, this.state.slideUrl);
  }

  render() {
    const {isNew, onCancel, saving, error} = this.props;

    return (
      <ModalWindow onClose={onCancel} disabled={saving}>
        <Header isNew={isNew} onCancel={onCancel} saving={saving} />
        <form ref={this.form}
          className='save-diagram-form' onSubmit={this.handleSubmit}>
          <ModalBody>
            <FormRowContent label='Title:' fit={true}>
              <input type='text'
                name='title' className='form-control'
                value={this.state.title}
                onChange={this.handleTitleChange}
                required={true} />
            </FormRowContent>
            <FormRowContent label='Privacy:' fit={true}>
              {PERMISSION_OPTIONS.map( (option, index) =>
                <Option key={index}
                  name='permission'
                  label={option.label}
                  onChange={this.handlePermissionSelect}
                  value={option.value}
                  checked={(option.value === this.state.permission)} />
                )}
            </FormRowContent>
            <InModalError error={error} />
          </ModalBody>
          <ModalFooter>
            <button type='button'
              className='btn'
              disabled={saving}
              onClick={onCancel}>Cancel</button>
            <button type='submit'
              className='btn btn-primary'
              disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </ModalFooter>
        </form>
      </ModalWindow>
    );
  }
}

export default SaveForm;
