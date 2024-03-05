import { useState, useReducer } from 'react';

import { useLogInValidation } from './useLogInValidation';

const INPUT_ACTIONS = {
  UPDATE_EMAIL: 'update-email',
  UPDATE_PASSWORD: 'update-password',

  RESET_FORM: 'reset-form',
};

const inputValuesReducer = (inputValues, action) => {
  switch (action.type) {
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

    case INPUT_ACTIONS.RESET_FORM:
      return {
        email: '',
        password: '',
      };

    default: {
      throw Error('Unknown dispatch action type: ' + action.type);
    }
  }
};

let initialInputValues = {
  email: '',
  password: '',
};

let initialInputFocus = {
  isEmailFocused: false,
  isPasswordFocused: false,
};

export const useLogIn = () => {
  const [inputValues, dispatchInputValues] = useReducer(
    inputValuesReducer,
    initialInputValues
  );
  const [inputFocus, setInputFocus] = useState(initialInputFocus);
  const { dispatchValidation, VALIDATION_ACTIONS } = useLogInValidation();

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
      isEmailFocused: false,
      isPasswordFocused: false,
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
