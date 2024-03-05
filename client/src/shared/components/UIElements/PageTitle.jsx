import PropTypes from 'prop-types';

export const PageTitle = ({ title }) => {
  return <h1>{title}</h1>;
};

PageTitle.propTypes = {
  title: PropTypes.string,
};
