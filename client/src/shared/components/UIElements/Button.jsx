import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Button = (props) => {
  if (props.href) {
    return <a href={props.href}>{props.title}</a>;
  }
  if (props.to) {
    return <Link to={props.to}>{props.title}</Link>;
  }
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className="disabled:opacity-25"
    >
      {props.title}
    </button>
  );
};

Button.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
