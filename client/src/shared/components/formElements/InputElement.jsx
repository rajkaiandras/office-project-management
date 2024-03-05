import PropTypes from 'prop-types';
import Select from 'react-select';

import { ErrMessage } from '../UIElements/ErrMessage';

export const InputElement = (props) => {
  const {
    element,
    label,
    type,
    name,
    placeholder,
    value,
    rows,
    options,
    defaultValue,
    isMulti,
    isLoading,
    onChange,
    onBlur,
    isValid,
    isFocused,
    inputError,
  } = props;

  let elementType;
  if (element === 'input') {
    elementType = (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="block"
      />
    );
  } else if (element === 'textarea') {
    elementType = (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={onChange}
        onBlur={onBlur}
        className="block"
      />
    );
  } else if (element === 'select') {
    elementType = (
      <Select
        value={value}
        options={options}
        defaultValue={defaultValue}
        isMulti={isMulti}
        isLoading={isLoading}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  }

  return (
    <label className="block w-full max-w-xl">
      {label ? label : null}
      {elementType}
      {!isValid && isFocused ? <ErrMessage message={inputError} /> : null}
    </label>
  );
};

InputElement.propTypes = {
  element: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  rows: PropTypes.number,
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  isMulti: PropTypes.bool,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  onSelectChangeHandler: PropTypes.func,
  isValid: PropTypes.bool,
  isFocused: PropTypes.bool,
  onBlur: PropTypes.func,
  inputError: PropTypes.string,
};
