import * as _ from 'lodash';
var moment = require('moment');

// Import form actions
import {
  FORM_INPUT,
  SHOW_ERRORS,
  SET_FORM,
  RESET_FORM
} from '../actions/forms';

// Import forms
import {
  registrationForm,
  anotherForm
} from '../utils/initialForms';

/**
 * Initial state with all forms in application included.
 */
const inititalState = {
  [registrationForm.formName]: registrationForm,
  [anotherForm.formName]: anotherForm,
  changedForm: '',
  objectId: ''
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
  if (value.length && formField.regex) {
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
  if (value) {
    if (value.length === 0) {
      return false;
    }
  } else {
    // No value
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
 * @param  {[array]} fields [input fields in form]
 * @return {[object]}        [{name: value}]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function getValuesFromForm (fields) {
  let values = {};

  for (var i = 0; i < fields.length; i++) {
    if (fields[i].type === 'select') {
      // Select box with object
      values[fields[i].name] = fields[i].value.id;
    } else if (fields[i].type === 'date') {
      // Datepicker input
      values[fields[i].name] = fields[i].value._d;
    } else {
      // Textinput
      values[fields[i].name] = fields[i].value;
    }
  }

  return values;
}

/**
 * Set form with values
 *
 * @param  {[object]} form   [form]
 * @param  {[object]} values [values]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function setForm (form, values) {
  for (var i = 0; i < form.fields.length; i++) {
    if (form.fields[i].type === 'date') {
      // Date
      form.fields[i].value = moment(
        values[form.fields[i].name]
      );
    } else {
      // Textinput
      form.fields[i].value = values[form.fields[i].name];
    }

    form.fields[i].errorMessage = '';
    form.fields[i].isValid = true;
  }

  form.validForm = true;
  return form;
}

/**
 * Reset form to initial values.
 *
 * @param  {[object]} form [form]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function resetForm (form) {
  for (var i = 0; i < form.fields.length; i++) {
    if (form.fields[i].type === 'date') {
      // Date
      form.fields[i].value = null;
    } else {
      // Textinput
      form.fields[i].value = '';
    }

    form.fields[i].errorMessage = '';
  }

  form.validForm = false;
  return form;
}

/**
 * Handle forms reducer
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function handleForm (state = inititalState, action) {
  switch (action.type) {

    case FORM_INPUT: {
      // Get changed form and field
      let updatedForm = Object.assign({}, state[action.form]);
      let fieldIndex = getFormFieldIndex(updatedForm.fields, action.field);

      // Validate input in changed field
      let inputError = validateInput(
        updatedForm.fields[fieldIndex],
        action.newValue
      );

      // Update changed input field
      var newField = Object.assign({}, updatedForm.fields[fieldIndex], {
        value: action.newValue,
        errorMessage: action.validateNow ? inputError : '',
        isValid: inputError.length === 0
      });

      // Update the form
      updatedForm = updateFormFields(updatedForm, fieldIndex, newField);

      return Object.assign({}, state, {
        [action.form]: updatedForm,
        changedForm: `${action.form}`,
        objectId: _.uniqueId(`${action.form}ObjId_`)
      });
    }

    case SET_FORM: {
      // Copy form and set values
      let copyOfForm = Object.assign({}, action.form);
      let populatedForm = setForm(copyOfForm, action.values);

      return Object.assign({}, state, {
        [action.form.formName]: populatedForm,
        changedForm: `${action.form.formName}`,
        objectId: _.uniqueId(`${action.form.formName}ObjId_`)
      });
    }

    case RESET_FORM: {
      // Copy and set form to init form
      let copyOfForm = Object.assign({}, action.form);
      let initForm = resetForm(copyOfForm);

      return Object.assign({}, state, {
        [action.form.formName]: initForm,
        changedForm: `${action.form.formName}`,
        objectId: _.uniqueId(`${action.form.formName}ObjId_`)
      });
    }

    case SHOW_ERRORS: {
      // Copy form
      let errorForm = Object.assign({}, state[action.form]);

      // Go throw the form fields and get errors
      for (var i = 0; i < errorForm.fields.length; i++) {
        let error = validateInput(
          errorForm.fields[i],
          errorForm.fields[i].value
        );

        errorForm.fields[i].errorMessage = error;
        errorForm.fields[i].isValid = error.length === 0;
      }

      // Update form
      let formWithErrors = {
        formName: action.form,
        validForm: false,
        fields: errorForm.fields
      };

      return Object.assign({}, state, {
        [action.form]: formWithErrors,
        changedForm: action.form,
        objectId: _.uniqueId(`${action.form}ObjId_`)
      });
    }

    default: {
      return state;
    }
  }
}
