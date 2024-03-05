import { useState, useReducer } from 'react';

import { useCreateProjectValidation } from './useCreateProjectValidation';

const INPUT_ACTIONS = {
  UPDATE_PROJECT_NAME: 'update-project-name',
  UPDATE_PROJECT_DETAILS: 'update-project-details',
  UPDATE_DUE_DATE: 'update-due-date',
  UPDATE_CATEGORY: 'update-category',
  UPDATE_ASSIGNED_TO: 'update-assigned-to',
  RESET_FORM: 'reset-form',
};

const inputValuesReducer = (inputValues, action) => {
  switch (action.type) {
    case INPUT_ACTIONS.UPDATE_PROJECT_NAME:
      return {
        ...inputValues,
        projectName: action.payload.projectName,
      };
    case INPUT_ACTIONS.UPDATE_PROJECT_DETAILS:
      return {
        ...inputValues,
        projectDetails: action.payload.projectDetails,
      };
    case INPUT_ACTIONS.UPDATE_DUE_DATE:
      return {
        ...inputValues,
        dueDate: action.payload.dueDate,
      };
    case INPUT_ACTIONS.UPDATE_CATEGORY:
      return {
        ...inputValues,
        category: action.payload.category,
      };
    case INPUT_ACTIONS.UPDATE_ASSIGNED_TO:
      return {
        ...inputValues,
        assignedTo: action.payload.assignedTo,
      };
    case INPUT_ACTIONS.RESET_FORM:
      return {
        projectName: '',
        projectDetails: '',
        dueDate: '',
        category: '',
        assignedTo: [],
      };

    default: {
      throw Error('Unknown dispatch action type: ' + action.type);
    }
  }
};

let initialInputValues = {
  projectName: '',
  projectDetails: '',
  dueDate: '',
  category: '',
  assignedTo: [],
};

let initialInputFocus = {
  isProjectNameFocused: false,
  isProjectDetailsFocused: false,
  isDueDateFocused: false,
  isCategoryFocused: false,
  isAssignedToFocused: false,
};

export const useCreateProject = () => {
  const [inputValues, dispatchInputValues] = useReducer(
    inputValuesReducer,
    initialInputValues
  );
  const [inputFocus, setInputFocus] = useState(initialInputFocus);
  const { dispatchValidation, VALIDATION_ACTIONS } =
    useCreateProjectValidation();

  const onChangeHandler = (e, updateType) => {
    dispatchInputValues({
      type: updateType,
      payload: { [e.target.name]: e.target.value },
    });
  };

  const onSelectChangeHandler = (selectedOption, updateType) => {
    dispatchInputValues({
      type: updateType,
      payload: { category: selectedOption.value },
    });
  };

  const onMultiSelectChangeHandler = (selectedOption, updateType) => {
    dispatchInputValues({
      type: updateType,
      payload: { assignedTo: [...selectedOption] },
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
      isProjectNameFocused: false,
      isProjectDetailsFocused: false,
      isDueDateFocused: false,
      isCategoryFocused: false,
      isAssignedToFocused: false,
    });
  };

  return {
    inputValues,
    dispatchInputValues,
    INPUT_ACTIONS,
    onChangeHandler,
    onSelectChangeHandler,
    onMultiSelectChangeHandler,
    inputFocus,
    setInputFocus,
    onBlurHandler,
    resetForm,
  };
};
