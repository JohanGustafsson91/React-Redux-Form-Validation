import React, { PropTypes } from 'react';
import TextInput from '../general-components/TextInput';

const RegistrationForm = React.createClass({
  render () {

    /**
     * Render all form fields in the form.
     */

    let form = this.props.form.fields.map((f) => {

      // Error message handling
      let errorMessage = f.errorMessage.length > 0 ?
        <p className="red-text">{f.errorMessage}</p> : null;

      let errorStyle = {
        borderColor: f.errorMessage.length > 0 ? '#bb3232' : null
      };

      return (
        <div className="row" key={f.name}>
          <div className="col-xs-5">
            <label className="solid-form-label">{f.label}</label>
          </div>
          <div className="col-xs-7">
            <TextInput
              className="solid-input"
              style={errorStyle}
              type={f.type}
              placeholder={f.placeholder}
              keyName={f.name}
              value={f.value}
              onChange={(e) => {
                this.props.handleChange(
                  this.props.form.formName,
                  f.name,
                  e.target.value,
                  !f.validateOnBlur
                );
              }}
              onBlur={(e) => {
                if (f.validateOnBlur === true) {
                  this.props.handleChange(
                    this.props.form.formName,
                    f.name,
                    e.target.value,
                    true
                  );
                }
              }} />
              {errorMessage}
          </div>
        </div>
      );
    });

    // Form status message
    let formStatus = this.props.form.validForm ?
    <p className="green-text"><i>The form is valid!</i></p> :
    <p><i>The form is not valid!</i></p>;

    return (
      <div>
        <h3>Registration form (validation on blur)</h3>
        {form}
        <div className="row">
          <div className="col-xs-8">
            {formStatus}
          </div>
          <div className="col-xs-4 text-right">
            <button
              className={this.props.form.validForm ?
                        "solid-btn green" : "solid-btn"}
              onClick={this.props.submit} >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
});

RegistrationForm.propTypes = {
  form: PropTypes.object.isRequired
};

export default RegistrationForm;
