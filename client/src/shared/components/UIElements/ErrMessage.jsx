import PropTypes from 'prop-types';

export const ErrMessage = (props) => {
  const { message } = props;

  return message ? <div className="text-[--err-text]">{message}</div> : null;
};

ErrMessage.propTypes = {
  message: PropTypes.string,
};
