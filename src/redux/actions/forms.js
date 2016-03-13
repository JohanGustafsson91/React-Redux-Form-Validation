// Constants
export const FORM_INPUT = 'FORM_INPUT';
export const SET_FORM = 'SET_FORM';
export const RESET_FORM = 'RESET_FORM';
export const SHOW_ERRORS = 'SHOW_ERRORS';

// Constants for forms named as forms in initialForms
export const REGISTRATION_FORM = 'registrationForm';
export const ANOTHER_FORM = 'anotherForm';

/**
 * @param  {[string]} form      [form name]
 * @param  {[string]} field     [changed input field name]
 * @param  {[string]} value     [new value]
 * @param  {[boolean]} validate [true / false]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function formInput (form, field, value, validate) {
  return {
    type: FORM_INPUT,
    form: form,
    field: field,
    newValue: value,
    validateNow: validate
  };
}

/**
 * @param  {[object]} form [form]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function showErrors (form) {
  return {
    type: SHOW_ERRORS,
    form: form
  };
}

/**
 * @param  {[object]} form   [form]
 * @param  {[array]} values   [array with form values]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function setForm (form, values) {
  return {
    type: SET_FORM,
    form: form,
    values: values
  };
}

/**
 * @param  {[object]} form [form
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function resetForm (form) {
  return {
    type: RESET_FORM,
    form: form
  };
}
