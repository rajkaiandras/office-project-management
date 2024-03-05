import { useState, useReducer } from 'react';

import { useSignUpValidation } from './useSignUpValidation';

const INPUT_ACTIONS = {
  UPDATE_FIRST_NAME: 'update-first-name',
  UPDATE_LAST_NAME: 'update-last-name',
  UPDATE_EMAIL: 'update-email',
  UPDATE_PASSWORD: 'update-password',
  UPDATE_PASSWORD_CONFIRM: 'update-password-confirm',
  RESET_FORM: 'reset-form',
};

const inputValuesReducer = (inputValues, action) => {
  switch (action.type) {
    case INPUT_ACTIONS.UPDATE_FIRST_NAME:
      return {
        ...inputValues,
        firstName: action.payload.firstName,
      };
    case INPUT_ACTIONS.UPDATE_LAST_NAME:
      return {
        ...inputValues,
        lastName: action.payload.lastName,
      };
    case INPUT_ACTIONS.UPDATE_EMAIL:
      return {
        ...inputValues,
        email: action.payload.email,
      };
    case INPUT_ACTIONS.UPDATE_PASSWORD:
      return {
        ...inputValues,
        password: action.payload.password,
      };
    case INPUT_ACTIONS.UPDATE_PASSWORD_CONFIRM:
      return {
        ...inputValues,
        passwordConfirm: action.payload.passwordConfirm,
      };
    case INPUT_ACTIONS.RESET_FORM:
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
      };

    default: {
      throw Error('Unknown dispatch action type: ' + action.type);
    }
  }
};

let initialInputValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

let initialInputFocus = {
  isFirstNameFocused: false,
  isLastNameFocused: false,
  isEmailFocused: false,
  isPasswordFocused: false,
  isPasswordConfirmFocused: false,
};

export const useSignUp = () => {
  const [inputValues, dispatchInputValues] = useReducer(
    inputValuesReducer,
    initialInputValues
  );
  const [inputFocus, setInputFocus] = useState(initialInputFocus);
  const { dispatchValidation, VALIDATION_ACTIONS } = useSignUpValidation();

  const onChangeHandler = (e, updateType) => {
    dispatchInputValues({
      type: updateType,
      payload: { [e.target.name]: e.target.value },
    });
  };

  const onBlurHandler = (property, value) => {
    setInputFocus({ ...inputFocus, [property]: value });
  };

  const resetForm = () => {
    dispatchInputValues({
      type: INPUT_ACTIONS.RESET_FORM,
    });

    dispatchValidation({ type: VALIDATION_ACTIONS.RESET_VALIDATION });

    setInputFocus({
      isFirstNameFocused: false,
      isLastNameFocused: false,
      isEmailFocused: false,
      isPasswordFocused: false,
      isPasswordConfirmFocused: false,
    });
  };

  return {
    inputValues,
    dispatchInputValues,
    INPUT_ACTIONS,
    onChangeHandler,
    inputFocus,
    setInputFocus,
    onBlurHandler,
    resetForm,
  };
};
