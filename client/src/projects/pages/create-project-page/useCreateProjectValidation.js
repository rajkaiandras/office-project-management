import { useReducer } from 'react';
import { format } from 'date-fns';

import { regExValidation } from '../../../constants/regExValidation';

const VALIDATION_ACTIONS = {
  VALIDATE_PROJECT_NAME: 'validate-project-name',
  VALIDATE_PROJECT_DETAILS: 'validate-project-details',
  VALIDATE_DUE_DATE: 'validate-due-date',
  VALIDATE_CATEGORY: 'validate-category',
  VALIDATE_ASSIGNED_TO: 'validate-assigned-to',
  RESET_VALIDATION: 'reset-validation',
};

const validationReducer = (validationResults, action) => {
  switch (action.type) {
    case VALIDATION_ACTIONS.VALIDATE_PROJECT_NAME:
      return {
        ...validationResults,
        isProjectNameValid: regExValidation.projectNameRegex.test(
          action.payload.projectName
        ),
      };
    case VALIDATION_ACTIONS.VALIDATE_PROJECT_DETAILS:
      return {
        ...validationResults,
        isProjectDetailsValid: regExValidation.projectDetailsRegex.test(
          action.payload.projectDetails
        ),
      };
    case VALIDATION_ACTIONS.VALIDATE_DUE_DATE:
      return {
        ...validationResults,
        isDueDateValid:
          format(new Date(action.payload.dueDate), 'yyyy/MM/dd') >
          format(new Date(), 'yyyy/MM/dd'),
      };
    case VALIDATION_ACTIONS.VALIDATE_CATEGORY:
      return {
        ...validationResults,
        isCategoryValid: action.payload.category !== '',
      };
    case VALIDATION_ACTIONS.VALIDATE_ASSIGNED_TO:
      return {
        ...validationResults,
        isAssignedToValid: action.payload.assignedTo.length !== 0,
      };
    case VALIDATION_ACTIONS.RESET_VALIDATION:
      return {
        isProjectNameValid: false,
        isProjectDetailsValid: false,
        isDueDateValid: false,
        isCategoryValid: false,
        isAssignedToValid: false,
      };

    default: {
      throw Error('Unknown dispatch action type: ' + action.type);
    }
  }
};

let initialValidationResults = {
  isProjectNameValid: false,
  isProjectDetailsValid: false,
  isDueDateValid: false,
  isCategoryValid: false,
  isAssignedToValid: false,
};

export const useCreateProjectValidation = () => {
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

  const onSelectChangeValidation = (selectedOption, validationType) => {
    dispatchValidation({
      type: validationType,
      payload: { category: selectedOption.value },
    });
  };

  const onMultiSelectChangeValidation = (selectedOption, validationType) => {
    dispatchValidation({
      type: validationType,
      payload: { assignedTo: [...selectedOption] },
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
    onMultiSelectChangeValidation,
    onSelectChangeValidation,
    validationResultsCheck,
  };
};
