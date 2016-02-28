import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// Forms
import RegistrationForm from '../components/forms/RegistrationForm';
import AnotherForm from '../components/forms/AnotherForm';

// Dispatch actions
import {
  formInput,
  showErrors
} from '../redux/actions/forms';


const HomeView = React.createClass({

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
            handleChange={this._handleFormInput}
            submit={() => {
              if (this.props.registrationForm.validForm) {
                console.log("SUBMIT!");
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
            submit={() => {
              if (this.props.anotherForm.validForm) {
                console.log("SUBMIT!");
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

HomeView.propTypes = {
  registrationForm: PropTypes.object.isRequired,
  anotherForm: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  errorText: PropTypes.string
};

const mapStateToProps = (state) => ({
  registrationForm: state.handleForm.registrationForm,
  anotherForm: state.handleForm.anotherForm
});

export default connect(mapStateToProps)(HomeView);
