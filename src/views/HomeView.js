import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Forms
import RegistrationForm from '../components/forms/RegistrationForm';
import AnotherForm from '../components/forms/AnotherForm';

// Dispatch actions
import {
  formInput,
  showErrors,
  resetForm
} from '../redux/actions/forms';

import { getValuesFromForm } from '../redux/reducers/forms';

const HomeView = React.createClass({

  propTypes: {
    registrationForm: PropTypes.object.isRequired,
    anotherForm: PropTypes.object.isRequired,
    formObjectId: PropTypes.string.isRequired,
    changedForm: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    errorText: PropTypes.string
  },

  /**
   * @param  {[object]} form        [form]
   * @param  {[string]} keyName     [changed input name]
   * @param  {[string]} value       [new value]
   * @param  {[boolean]} validateNow [false if validation on blur]
   *
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _handleFormInput (form, keyName, value, validateNow) {
    this.props.dispatch(
      formInput(form, keyName, value, validateNow)
    );
  },

  render () {
    return (
      <div className="row">

        <div className="col-xs-6">

          <RegistrationForm
            form={this.props.registrationForm}
            formObjectId={this.props.formObjectId}
            changedForm={this.props.changedForm}
            handleChange={this._handleFormInput}
            resetForm={() => {
              this.props.dispatch(
                resetForm(this.props.registrationForm)
              );
            }}
            submit={() => {
              if (this.props.registrationForm.validForm) {
                alert(
                  // Debug output from submit
                  JSON.stringify(
                    getValuesFromForm(this.props.registrationForm.fields)
                  )
                );
              } else {
                this.props.dispatch(
                  showErrors(this.props.registrationForm.formName)
                );
              }
            }} />

        </div>

        <div className="col-xs-6">

          <AnotherForm
            form={this.props.anotherForm}
            handleChange={this._handleFormInput}
            formObjectId={this.props.formObjectId}
            changedForm={this.props.changedForm}
            resetForm={() => {
              this.props.dispatch(
                resetForm(this.props.anotherForm)
              );
            }}
            submit={() => {
              if (this.props.anotherForm.validForm) {
                alert(
                  // Debug output from submit
                  JSON.stringify(
                    getValuesFromForm(this.props.anotherForm.fields)
                  )
                );
              } else {
                this.props.dispatch(
                  showErrors(this.props.anotherForm.formName)
                );
              }
            }} />

        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  registrationForm: state.handleForm.registrationForm,
  anotherForm: state.handleForm.anotherForm,
  changedForm: state.handleForm.changedForm,
  formObjectId: state.handleForm.objectId
});

export default connect(mapStateToProps)(HomeView);
