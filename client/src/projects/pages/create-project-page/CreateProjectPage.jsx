import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateProject } from './useCreateProject.js';
import { useCreateProjectValidation } from './useCreateProjectValidation.js';
import { GettingUsers } from '../../../services/GettingUsers.js';
import { CreatingProject } from '../../../services/CreatingProject.js';

import { categoryLabelsOptions } from '../../../docs/categoryLabelsOptions.js';
import { usersToOptions } from '../../../utilities/usersToOptions.js';
import { optionsToAssignedTo } from '../../../utilities/optionsToAssignedTo.js';
import { assignedToDefaultOptions } from '../../../utilities/assignedToDefaultOptions.js';

import { SectionTitle } from '../../../shared/components/UIElements/SectionTitle.jsx';
import { InputElement } from '../../../shared/components/formElements/InputElement.jsx';
import { Button } from '../../../shared/components/UIElements/Button.jsx';
import { ErrMessage } from '../../../shared/components/UIElements/ErrMessage.jsx';

export const CreateProjectPage = ({ editMode }) => {
  const [category, setCategory] = useState(
    editMode.projectData?.category || []
  );
  const [assignedTo, setAssignedTo] = useState(
    editMode.projectData?.assignedTo || []
  );

  useEffect(() => {
    console.log(assignedTo);
  }, [assignedTo]);

  useEffect(() => {
    if (editMode.isActive) {
      Object.entries(editMode.projectData).map((entry) => {
        let entryName = entry[0];
        let entryValue = entry[1];
        let actionType;
        let isValidActionType = true;

        let e = {
          target: {
            name: entryName,
            value: entryValue,
          },
        };

        switch (entryName) {
          case 'projectName':
            actionType = INPUT_ACTIONS.UPDATE_PROJECT_NAME;
            break;
          case 'projectDetails':
            actionType = INPUT_ACTIONS.UPDATE_PROJECT_DETAILS;
            break;
          case 'dueDate':
            actionType = INPUT_ACTIONS.UPDATE_DUE_DATE;
            break;
          case 'category':
            actionType = INPUT_ACTIONS.UPDATE_CATEGORY;
            break;
          case 'assignedTo':
            actionType = INPUT_ACTIONS.UPDATE_ASSIGNED_TO;
            break;
          default:
            isValidActionType = false;
            console.log('UNKNOWN ACTION TYPE', actionType);
        }

        if (entryName === 'projectName' && isValidActionType) {
          onChangeHandler(e, actionType);
          onChangeValidation(e, VALIDATION_ACTIONS.VALIDATE_PROJECT_NAME);
        }
        if (entryName === 'projectDetails' && isValidActionType) {
          onChangeHandler(e, actionType);
          onChangeValidation(e, VALIDATION_ACTIONS.VALIDATE_PROJECT_DETAILS);
        }
        if (entryName === 'dueDate' && isValidActionType) {
          onChangeHandler(e, actionType);
          onChangeValidation(e, VALIDATION_ACTIONS.VALIDATE_DUE_DATE);
        }
        if (entryName === 'category' && isValidActionType) {
          let payload = { selectedOption: category };

          onSelectChangeHandler(payload, actionType);
          onSelectChangeValidation(
            payload,
            VALIDATION_ACTIONS.VALIDATE_CATEGORY
          );
        }
        if (entryName === 'assignedTo' && isValidActionType) {
          let payload = { assignedTo: assignedTo };

          onMultiSelectChangeHandler(payload, actionType);
          onMultiSelectChangeValidation(
            payload,
            VALIDATION_ACTIONS.VALIDATE_ASSIGNED_TO
          );
        }
      });
    }
  }, []);

  const navigate = useNavigate();
  const {
    users,
    isGettingUsersPending,
    isGettingUsersSuccess,
    gettingUsersError,
  } = GettingUsers();
  const [assignedToOptions, setAssignedToOptions] = useState([]);
  const {
    inputValues,
    INPUT_ACTIONS,
    onChangeHandler,
    onSelectChangeHandler,
    onMultiSelectChangeHandler,
    inputFocus,
    onBlurHandler,
    resetForm,
  } = useCreateProject();
  const {
    validationResults,
    VALIDATION_ACTIONS,
    onChangeValidation,
    onSelectChangeValidation,
    onMultiSelectChangeValidation,
    validationResultsCheck,
  } = useCreateProjectValidation();
  const {
    creatingProject,
    isCreatingProjectPending,
    isCreatingProjectSuccess,
    creatingProjectError,
  } = CreatingProject();

  useEffect(() => {
    if (isGettingUsersSuccess) {
      let options = usersToOptions(users);
      setAssignedToOptions(options);
    }
  }, [users]);

  const createProjectHandler = async (e) => {
    e.preventDefault();

    const formattedInputValues = {
      ...inputValues,
      assignedTo: optionsToAssignedTo(inputValues.assignedTo),
      issues: [],
    };

    creatingProject(formattedInputValues);
    console.log(formattedInputValues);
  };

  useEffect(() => {
    if (isCreatingProjectSuccess) {
      navigate('/projects');
      resetForm();
    }
  }, [isCreatingProjectSuccess]);

  return (
    <section className="col-start-4 col-end-13 row-span-1">
      <SectionTitle
        title={
          editMode.isActive ? 'Edit project details' : 'Create a new project'
        }
      />

      <form onSubmit={createProjectHandler}>
        <InputElement
          element={'input'}
          type={'text'}
          name={'projectName'}
          placeholder={'Project name'}
          value={inputValues.projectName}
          onChange={(e) => {
            onChangeHandler(e, INPUT_ACTIONS.UPDATE_PROJECT_NAME);
            onChangeValidation(e, VALIDATION_ACTIONS.VALIDATE_PROJECT_NAME);
          }}
          onBlur={() => {
            onBlurHandler('isProjectNameFocused', true);
          }}
          isValid={validationResults.isProjectNameValid}
          isFocused={inputFocus.isProjectNameFocused}
          inputError={
            'It should be a valid project name without special characters!'
          }
        />
        <InputElement
          element={'textarea'}
          type={'text'}
          name={'projectDetails'}
          placeholder={'Summary of project purpose and goals...'}
          value={inputValues.projectDetails}
          rows={6}
          onChange={(e) => {
            onChangeHandler(e, INPUT_ACTIONS.UPDATE_PROJECT_DETAILS);
            onChangeValidation(e, VALIDATION_ACTIONS.VALIDATE_PROJECT_DETAILS);
          }}
          onBlur={() => {
            onBlurHandler('isProjectDetailsFocused', true);
          }}
          isValid={validationResults.isProjectDetailsValid}
          isFocused={inputFocus.isProjectDetailsFocused}
          inputError={'Character limit is between 32 and 256!'}
        />
        <InputElement
          element={'input'}
          label={'Set due date'}
          type={'date'}
          name={'dueDate'}
          value={inputValues.dueDate}
          onChange={(e) => {
            onChangeHandler(e, INPUT_ACTIONS.UPDATE_DUE_DATE);
            onChangeValidation(e, VALIDATION_ACTIONS.VALIDATE_DUE_DATE);
          }}
          onBlur={() => {
            onBlurHandler('isDueDateFocused', true);
          }}
          isValid={validationResults.isDueDateValid}
          isFocused={inputFocus.isDueDateFocused}
          inputError={'Past date not allowed!'}
        />
        <InputElement
          element={'select'}
          label={'Project Category'}
          name={'category'}
          options={categoryLabelsOptions}
          defaultValue={categoryLabelsOptions.filter(
            (label) => label.value === category
          )}
          onChange={(selectedOption) => {
            onSelectChangeHandler(
              selectedOption,
              INPUT_ACTIONS.UPDATE_CATEGORY
            );
            onSelectChangeValidation(
              selectedOption,
              VALIDATION_ACTIONS.VALIDATE_CATEGORY
            );
          }}
          onBlur={() => {
            onBlurHandler('isCategoryFocused', true);
          }}
          isValid={validationResults.isCategoryValid}
          isFocused={inputFocus.isCategoryFocused}
          inputError={'You have to pick a category!'}
        />
        <InputElement
          element={'select'}
          label={'Assigned to'}
          name={'assignedTo'}
          // value={inputValues.assignedTo}
          options={assignedToOptions}
          isMulti={true}
          defaultValue={
            editMode.isActive && assignedToDefaultOptions(assignedTo)
          }
          isLoading={isGettingUsersPending}
          onChange={(selectedOption) => {
            setAssignedTo(selectedOption);
            onMultiSelectChangeHandler(
              selectedOption,
              INPUT_ACTIONS.UPDATE_ASSIGNED_TO
            );
            onMultiSelectChangeValidation(
              selectedOption,
              VALIDATION_ACTIONS.VALIDATE_ASSIGNED_TO
            );
          }}
          onBlur={() => {
            onBlurHandler('isAssignedToFocused', true);
          }}
          isValid={validationResults.isAssignedToValid}
          isFocused={inputFocus.isAssignedToFocused}
          inputError={
            'At least one user involved in the project must be specified!'
          }
        />
        <ErrMessage message={gettingUsersError} />
        <ErrMessage message={creatingProjectError} />
        {validationResultsCheck() ? (
          editMode.isActive ? (
            <Button title={isCreatingProjectPending ? 'Updating' : 'Update'} />
          ) : (
            <Button title={isCreatingProjectPending ? 'Creating' : 'Create'} />
          )
        ) : (
          <Button title={editMode.isActive ? 'Update' : 'Create'} disabled />
        )}{' '}
      </form>
    </section>
  );
};

CreateProjectPage.propTypes = {
  editMode: PropTypes.shape({
    isActive: PropTypes.bool,
    projectData: PropTypes.shape({
      _id: PropTypes.string,
      projectName: PropTypes.string,
      projectDetails: PropTypes.string,
      issues: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          columnId: PropTypes.string,
          content: PropTypes.string,
        })
      ),
      category: PropTypes.string,
      assignedTo: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
          fullName: PropTypes.string,
        })
      ),
      priority: PropTypes.string,
    }),
  }),
};
