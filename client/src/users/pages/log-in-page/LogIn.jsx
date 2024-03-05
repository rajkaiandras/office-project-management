import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthLogIn } from '../../../services/AuthLogIn';

import { useLogIn } from './useLogIn';
import { useLogInValidation } from './useLogInValidation';

import { InputElement } from '../../../shared/components/formElements/InputElement';
import { Button } from '../../../shared/components/UIElements/Button';
import { ErrMessage } from '../../../shared/components/UIElements/ErrMessage';
import { SectionTitle } from '../../../shared/components/UIElements/SectionTitle';

export const LogIn = () => {
  const navigate = useNavigate();
  const { logIn, isLogInPending, isLogInSuccess, logInError } = AuthLogIn();
  const {
    inputValues,
    INPUT_ACTIONS,
    onChangeHandler,
    inputFocus,
    onBlurHandler,
    resetForm,
  } = useLogIn();
  const {
    validationResults,
    VALIDATION_ACTIONS,
    onChangeValidation,
    validationResultsCheck,
  } = useLogInValidation();

  const authLoginHandler = (e) => {
    e.preventDefault();

    logIn(inputValues);
  };

  useEffect(() => {
    if (isLogInSuccess) {
      navigate('/dashboard');
      resetForm();
    }
  }, [isLogInSuccess]);

  return (
    <section>
      <SectionTitle title={'Please Log In'} />

      <form onSubmit={(e) => authLoginHandler(e)}>
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
          onBlur={() => onBlurHandler('isEmailFocused', true)}
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
          onBlur={() => onBlurHandler('isPasswordFocused', true)}
          isValid={validationResults.isPasswordStrong}
          isFocused={inputFocus.isPasswordFocused}
          inputError={
            'Password should be 8-36 characters and include at least one of the following: lowercase letter, uppercase letter, number, special character!'
          }
        />

        <ErrMessage message={logInError} />

        {validationResultsCheck() ? (
          <Button title={isLogInPending ? 'Logging in' : 'Log in'} />
        ) : (
          <Button title={'Log in'} disabled />
        )}
      </form>

      <section>
        <p>Do not have an account?</p>
        <Link to="/auth/signup">SIGN UP</Link>
      </section>

      <p className="text-red-500 mt-16">Use these credentials or sign up:</p>
      <ul>
        <li>
          email: <span className="text-white">andras.rajkai@gmail.com</span>
        </li>
        <li>
          password: <span className="text-white">1&apos;aAtest</span>
        </li>
      </ul>
    </section>
  );
};
