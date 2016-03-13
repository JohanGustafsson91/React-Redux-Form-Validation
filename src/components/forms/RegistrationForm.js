import React, { PropTypes } from 'react';
import TextInput from '../general-components/TextInput';
var DatePicker = require('react-datepicker');
var moment = require('moment');

const RegistrationForm = React.createClass({

  propTypes: {
    form: PropTypes.object.isRequired,
    formObjectId: PropTypes.string.isRequired,
    changedForm: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  },

  shouldComponentUpdate (nextProps, nextState) {
    let updatedForm = nextProps.formObjectId !== this.props.formObjectId;
    let changedForm = nextProps.changedForm === this.props.form.formName;
    console.log(nextProps.changedForm, this.props.form.formName);
    return updatedForm && changedForm;
  },

  render () {
    console.info('RegistrationForm updated!'); // Debug

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

      // Debug required field in GUI
      let required = f.required ? ' *' : '';

      let startDate = moment();

      return (
        <div className="row" key={f.name}>
          <div className="col-xs-5">
            <label className="solid-form-label">{f.label}{required}</label>
          </div>
          <div className="col-xs-7">

              {f.type === 'text' ?
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
                : null }

                {f.type === 'date' ?
                  <DatePicker
                    dateFormat="YYYY/MM/DD"
                    className="solid-input"
                    keyName={f.name}
                    selected={f.value}
                    isClearable={true}
                    placeholderText={f.placeholder}
                    maxDate={startDate}
                    locale="sv_SE"
                    onChange={(date) => {
                      this.props.handleChange(
                        this.props.form.formName,
                        f.name,
                        date || startDate,
                        !f.validateOnBlur
                      );
                    }} />
                  : null }

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
              className="solid-btn"
              onClick={this.props.resetForm} >
              Reset form
            </button>
            <button
              className={this.props.form.validForm ?
                        'solid-btn green' : 'solid-btn'}
              onClick={this.props.submit} >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
});

export default RegistrationForm;
