/**
* Initial state for forms in the application
*/

import {
  REGISTRATION_FORM,
  ANOTHER_FORM
} from '../actions/forms';

export const registrationForm = {
  formName: REGISTRATION_FORM,
  validForm: false,
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Enter your name',
      value: '',
      errorMessage: '',
      validateOnBlur: true,
      required: true,
      regex: [
        {
          pattern: /^[a-zA-ZåäöÅÄÖ ]*$/,
          message: 'Name can only contain letters',
        }
      ],
      isValid: false
    },
    {
      type: 'text',
      name: 'phone',
      label: 'Phone',
      placeholder: 'Enter your phone number',
      value: '',
      errorMessage: '',
      validateOnBlur: true,
      required: false,
      regex: [
        {
          pattern: /0([-\s]?\d){6,10}/,
          message: 'You must enter a valid phone number',
        }
      ],
      isValid: true
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      required: true,
      value: '',
      errorMessage: '',
      validateOnBlur: true,
      regex: [
        {
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'You must enter a valid email',
        }
      ],
      isValid: false
    },
    {
      type: 'text',
      name: 'ssn',
      label: 'Social Security Number',
      placeholder: 'Enter your social security number (yyyymmdd-xxxx)',
      value: '',
      errorMessage: '',
      validateOnBlur: true,
      required: false,
      regex: [
        {
          pattern: /^\d{6,8}[-|(\s)]{0,1}\d{4}$/,
          message: 'You must valid social security number',
        }
      ],
      isValid: true
    }
  ]
};

export const anotherForm = {
  formName: ANOTHER_FORM,
  fields: [
    {
      type: 'text',
      name: 'last_name',
      label: 'Surname',
      placeholder: 'Enter your surname',
      value: '',
      errorMessage: '',
      validateOnBlur: false,
      required: true,
      regex: [
        {
          pattern: /^[a-zA-ZåäöÅÄÖ]*$/,
          message: 'Surname can only contain letters',
        }
      ],
      isValid: false
    },
    {
      type: 'text',
      name: 'favorite_number',
      label: 'Favorite number',
      placeholder: 'Enter your favorite number',
      value: '',
      errorMessage: '',
      validateOnBlur: false,
      required: false,
      regex: [
        {
          pattern: /([-\s]?\d){1,10}/,
          message: 'You must enter a valid number',
        }
      ],
      isValid: true
    },
  ]
};
