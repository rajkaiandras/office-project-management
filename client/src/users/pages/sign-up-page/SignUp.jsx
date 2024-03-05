import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthSignUp } from '../../../services/AuthSignUp';

import { useSignUp } from './useSignUp.js';
import { useSignUpValidation } from './useSignUpValidation.js';

import { InputElement } from '../../../shared/components/formElements/InputElement.jsx';
import { Button } from '../../../shared/components/UIElements/Button.jsx';
import { ErrMessage } from '../../../shared/components/UIElements/ErrMessage.jsx';
import { SectionTitle } from '../../../shared/components/UIElements/SectionTitle.jsx';

export const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, isSignUpPending, isSignUpSuccess, signUpError } =
    AuthSignUp();
  const {
    inputValues,
    INPUT_ACTIONS,
    onChangeHandler,
    inputFocus,
    onBlurHandler,
    resetForm,
  } = useSignUp();
  const {
    validationResults,
    VALIDATION_ACTIONS,
    onChangeValidation,
    validationResultsCheck,
  } = useSignUpValidation();

  const authSignUpHandler = async (e) => {
    e.preventDefault();

    signUp(inputValues);
  };

  useEffect(() => {
    if (isSignUpSuccess) {
      navigate('/dashboard');
      resetForm();
    }
  }, [isSignUpSuccess]);

  return (
    <section>
      <SectionTitle title={'Sign Up'} />

      <form onSubmit={authSignUpHandler}>
        <InputElement
          element={'input'}
          type={'text'}
          name={'firstName'}
          placeholder={'First name'}
          value={inputValues.firstName}
          onChange={(e) => {
            onChangeHandler(e, INPUT_ACTIONS.UPDATE_FIRST_NAME);
            onChangeValidation(e, VALIDATION_ACTIONS.VALIDATE_FIRST_NAME);
          }}
          onBlur={() => {
            onBlurHandler('isFirstNameFocused', true);
          }}
          isValid={validationResults.isFirstNameValid}
          isFocused={inputFocus.isFirstNameFocused}
          inputError={'It should be a valid first name!'}
        />
        <InputElement
          element={'input'}
          type={'text'}
          name={'lastName'}
          placeholder={'Last name'}
          value={inputValues.lastName}
          onChange={(e) => {
            onChangeHandler(e, INPUT_ACTIONS.UPDATE_LAST_NAME);
            onChangeValidation(e, VALIDATION_ACTIONS.VALIDATE_LAST_NAME);
          }}
          onBlur={() => {
            onBlurHandler('isLastNameFocused', true);
          }}
          isValid={validationResults.isLastNameValid}
          isFocused={inputFocus.isLastNameFocused}
          inputError={'It should be a valid last name!'}
        />
        <InputElement
          element={'input'}
          type={'email'}
          name={'email'}
          placeholder={'E-mail address'}
          value={inputValues.email}
          onChange={(e) => {
            onChangeHandler(e, INPUT_ACTIONS.UPDATE_EMAIL);
            onChangeValidation(e, VALIDATION_ACTIONS.VALIDATE_EMAIL);
          }}
          onBlur={() => {
            onBlurHandler('isEmailFocused', true);
          }}
          isValid={validationResults.isEmailValid}
          isFocused={inputFocus.isEmailFocused}
          inputError={'It should be a valid e-mail address!'}
        />
        <InputElement
          element={'input'}
          type={'password'}
          name={'password'}
          placeholder={'Password'}
          value={inputValues.password}
          onChange={(e) => {
            onChangeHandler(e, INPUT_ACTIONS.UPDATE_PASSWORD);
            onChangeValidation(e, VALIDATION_ACTIONS.VALIDATE_PASSWORD);
          }}
          onBlur={() => {
            onBlurHandler('isPasswordFocused', true);
          }}
          isValid={validationResults.isPasswordStrong}
          isFocused={inputFocus.isPasswordFocused}
          inputError={
            'Password should be 8-36 characters and include at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!'
          }
        />
        <InputElement
          element={'input'}
          type={'password'}
          name={'passwordConfirm'}
          placeholder={'Confirm your password'}
          value={inputValues.passwordConfirm}
          onChange={(e) => {
            onChangeHandler(e, INPUT_ACTIONS.UPDATE_PASSWORD_CONFIRM);
            onChangeValidation(
              e,
              VALIDATION_ACTIONS.VALIDATE_PASSWORD_CONFIRM,
              inputValues.password
            );
          }}
          onBlur={() => {
            onBlurHandler('isPasswordConfirmFocused', true);
          }}
          isValid={validationResults.isPasswordConfirmMatch}
          isFocused={inputFocus.isPasswordConfirmFocused}
          inputError={'Passwords do not match!'}
        />

        <ErrMessage message={signUpError} />

        {validationResultsCheck() ? (
          <Button title={isSignUpPending ? 'Signing up' : 'Sign up'} />
        ) : (
          <Button title={'Sign up'} disabled />
        )}
      </form>

      <section>
        <p>Already a user?</p>
        <Link to="/auth">LOG IN</Link>
      </section>
    </section>
  );
};
