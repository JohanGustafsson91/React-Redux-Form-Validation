import * as _ from 'lodash';

// Import form actions
import {
  FORM_INPUT,
  SHOW_ERRORS,
  REGISTRATION_FORM,
  SUBMIT_REGISTRATION_FORM,
  ANOTHER_FORM
} from '../actions/forms';

// Import forms
import {
  registrationForm,
  anotherForm
} from '../utils/initialForms';

/**
 * Initial state with all forms in application
 * included.
 */
const inititalState = {
  "registrationForm": registrationForm,
  "anotherForm": anotherForm
};


/**
 * Return the index for the field in the form
 * that should be updated.
 *
 * @param  {[array]} form       [the form]
 * @param  {[string]} fieldName [name of input]
 * @return {[integer]}          [index of field]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function getFormFieldIndex (form, fieldName) {
  for (var i = 0; i < form.length; i++) {
    if (form[i].name === fieldName) {
      return i;
    }
  }
}

/**
 * Replaces the old input field informationen
 * with the new updated one and checks if the
 * form is valid.
 *
 * @param  {[array]} newForm          [new copy of form]
 * @param  {[integer]} newFieldIndex  [index of field]
 * @param  {[object]} newField        [updated field data]
 * @return {[array]}                  [new form]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function updateFormFields (newForm, newFieldIndex, newField) {
  newForm.fields.splice(newFieldIndex, 1, newField);

  // Check if the form is valid
  let validForm = true;
  for (var i = 0; i < newForm.fields.length; i++) {
    if (!newForm.fields[i].isValid) {
      validForm = false;
      break;
    }
  }

  newForm.validForm = validForm;   // Update status of form

  return newForm;
}

/**
 * Validates the input field.
 *
 * @param  {[object]} formField [the form field]
 * @param  {[string]} value     [new value in field]
 * @return {[type]}             [error message or empty string (no error)]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function validateInput (formField, value) {

  // Validate required field
  if (formField.required) {
    if (validateRequiredField(value) === false) {
      return 'You must enter a value';
    }
  }

  // Validate regular expressions
  if (value.length) {
    let regexError = validateRegularExpressions(formField.regex, value);
    if (regexError !== true) {
      return regexError;
    }
  }

  return '';  // No errors
}

/**
 * @param  {[string]} value   [new value]
 * @return {[boolean]}        [true if no error, else false]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function validateRequiredField (value) {
  if (value.length === 0) {
    return false;
  }
   return true;
}

/**
 * @param  {[array]} regex    [regular expressions]
 * @param  {[string]} value   [new value]
 * @return {[string/boolean]} [errormessage or true]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function validateRegularExpressions (regex, value) {
  for (var i = 0; i < regex.length; i++) {
    if (!regex[i].pattern.test(value)) {
      return regex[i].message;
    }
  }
  return true;
}

/**
 * Handle forms reducer
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function handleForm (
  state = inititalState, action
) {

  switch (action.type) {

    case FORM_INPUT: {

      // Get changed form and field
      let changedForm = Object.assign({}, state[action.form]);
      let fieldIndex = getFormFieldIndex(changedForm.fields, action.field);

      // Validate input in changed field
      let inputError = validateInput(
        changedForm.fields[fieldIndex],
        action.newValue
      );

      // Update changed input field
      var newField = Object.assign({}, changedForm.fields[fieldIndex], {
        value: action.newValue,
        errorMessage: action.validateNow ? inputError : '',
        isValid: inputError.length === 0 ? true : false
      });

      // Update the form
      let updatedForm = updateFormFields(changedForm, fieldIndex, newField);

      return Object.assign({}, state, {
        [action.form]: updatedForm
      });
    }

    case SHOW_ERRORS: {

      // Copy form
      let changedForm = Object.assign({}, state[action.form]);

      // Go throw the form fields and get errors
      for (var i = 0; i < changedForm.fields.length; i++) {

        let error = validateInput(
          changedForm.fields[i],
          changedForm.fields[i].value
        );

        changedForm.fields[i].errorMessage = error;
        changedForm.fields[i].isValid = error.length === 0 ? true : false;
      }

      // Update form
      let formWithErrors = {
        formName: [action.form],
        validForm: false,
        fields: changedForm.fields
      };

      return Object.assign({}, state, {
        [action.form]: formWithErrors
      });
    }

    default: {
      return state;
    }
  }
}
