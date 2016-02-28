// Constants
export const FORM_INPUT = 'FORM_INPUT';
export const SHOW_ERRORS = 'SHOW_ERRORS';
export const REGISTRATION_FORM = 'registrationForm';
export const SUBMIT_REGISTRATION_FORM = 'SUBMIT_REGISTRATION_FORM';
export const ANOTHER_FORM = 'anotherForm';
export const ANOTHER_FORM_INPUT = 'ANOTHER_FORM_INPUT';

export function formInput (form, field, value, validate) {
  return {
    type: FORM_INPUT,
    form: form,
    field: field,
    newValue: value,
    validateNow: validate
  };
}

export function showErrors (form) {
  return {
    type: SHOW_ERRORS,
    form: form
  };
}
