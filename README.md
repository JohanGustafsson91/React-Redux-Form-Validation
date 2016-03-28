Redux form validation
=======================

* All forms uses the same actions and reducer functions!

> A boilerplate with React where Redux is used for form validation. Contains generic actions and reducer which can be used to validate all forms on a page/application to avoid duplication of validation code.

*Live demo coming soon!*

## Instructions

**Specify form names in src/redux/actions/forms**
```
// Constants for forms named as forms in initialForms
export const REGISTRATION_FORM = 'registrationForm';
export const ANOTHER_FORM = 'anotherForm';
```
**Import them and specify form rules in src/redux/utils/initialForms**
```
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
          message: 'Name can only contain letters'
        }
      ],
      isValid: false
    },
    ...
```

**Import forms from initialForms in src/redux/utils/initialForms and add the t inititalState ***
```
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
```
*"changedForm" and "objectId" are variables to see which form that has been changed and to optimize components with shouldComponentUpdate()*

**Connect view/component with redux**
```
...

const mapStateToProps = (state) => ({
  registrationForm: state.handleForm.registrationForm,
  anotherForm: state.handleForm.anotherForm,
  changedForm: state.handleForm.changedForm,
  formObjectId: state.handleForm.objectId
});

export default connect(mapStateToProps)(HomeView);
```

**Render form in component**
```
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
    ...
```

**Dispatch actions**

| Action | Parameters | Description |
| --- | --- |
| formInput() | form object, keyName (field), new value, validateNow (true if validate now, else false for blur) | Dispatch on change for form elements |
| showErrors() | form name | Show all form errors (if user clicks submit with untouched fields etc.) |
| resetForm() | form object | Clear and set form to default values |

#### TODOS
- [ ] Change to ES6 classes
- [ ] Setup live demo
- [ ] Make instruction video

*Check [Starter kit](https://github.com/davezuko/react-redux-starter-kit/) for npm instructions*
