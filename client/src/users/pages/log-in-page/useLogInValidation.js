import { useReducer } from 'react';

import { regExValidation } from '../../../constants/regExValidation';

const VALIDATION_ACTIONS = {
  VALIDATE_EMAIL: 'validate-email',
  VALIDATE_PASSWORD: 'validate-password',
  RESET_VALIDATION: 'reset-validation',
};

const validationReducer = (validationResults, action) => {
  switch (action.type) {
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

    case VALIDATION_ACTIONS.RESET_VALIDATION:
      return {
        isEmailValid: false,
        isPasswordStrong: false,
      };

    default: {
      throw Error('Unknown dispatch action type: ' + action.type);
    }
  }
};

let initialValidationResults = {
  isEmailValid: false,
  isPasswordStrong: false,
};

export const useLogInValidation = () => {
  const [validationResults, dispatchValidation] = useReducer(
    validationReducer,
    initialValidationResults
  );

  const onChangeValidation = (e, validationType) => {
    dispatchValidation({
      type: validationType,
      payload: { [e.target.name]: e.target.value },
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
