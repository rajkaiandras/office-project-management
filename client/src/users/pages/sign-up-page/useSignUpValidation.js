import { useReducer } from 'react';

import { regExValidation } from '../../../constants/regExValidation';

const VALIDATION_ACTIONS = {
  VALIDATE_FIRST_NAME: 'validate-first-name',
  VALIDATE_LAST_NAME: 'validate-last-name',
  VALIDATE_EMAIL: 'validate-email',
  VALIDATE_PASSWORD: 'validate-password',
  VALIDATE_PASSWORD_CONFIRM: 'validate-password-confirm',
  RESET_VALIDATION: 'reset-validation',
};

const validationReducer = (validationResults, action) => {
  switch (action.type) {
    case VALIDATION_ACTIONS.VALIDATE_FIRST_NAME:
      return {
        ...validationResults,
        isFirstNameValid: regExValidation.firstNameRegex.test(
          action.payload.firstName
        ),
      };
    case VALIDATION_ACTIONS.VALIDATE_LAST_NAME:
      return {
        ...validationResults,
        isLastNameValid: regExValidation.lastNameRegex.test(
          action.payload.lastName
        ),
      };
    case VALIDATION_ACTIONS.VALIDATE_EMAIL:
      return {
        ...validationResults,
        isEmailValid: regExValidation.emailRegex.test(action.payload.email),
      };
    case VALIDATION_ACTIONS.VALIDATE_PASSWORD:
      return {
        ...validationResults,
        isPasswordStrong: regExValidation.passwordRegex.test(
          action.payload.password
        ),
      };
    case VALIDATION_ACTIONS.VALIDATE_PASSWORD_CONFIRM:
      return {
        ...validationResults,
        isPasswordConfirmMatch:
          action.payload.passwordConfirm === action.payload.currentPassword,
      };
    case VALIDATION_ACTIONS.RESET_VALIDATION:
      return {
        isFirstNameValid: false,
        isLastNameValid: false,
        isEmailValid: false,
        isPasswordStrong: false,
        isPasswordConfirmMatch: false,
      };

    default: {
      throw Error('Unknown dispatch action type: ' + action.type);
    }
  }
};

let initialValidationResults = {
  isFirstNameValid: false,
  isLastNameValid: false,
  isEmailValid: false,
  isPasswordStrong: false,
  isPasswordConfirmMatch: false,
};

export const useSignUpValidation = () => {
  const [validationResults, dispatchValidation] = useReducer(
    validationReducer,
    initialValidationResults
  );

  const onChangeValidation = (e, validationType, currentPassword) => {
    dispatchValidation({
      type: validationType,
      payload: { [e.target.name]: e.target.value, currentPassword },
    });
  };

  const validationResultsCheck = () => {
    return Object.values(validationResults).every((result) => {
      return result === true;
    });
  };

  return {
    validationResults,
    dispatchValidation,
    VALIDATION_ACTIONS,
    onChangeValidation,
    validationResultsCheck,
  };
};
