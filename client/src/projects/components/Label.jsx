import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { issueLabelsOptions } from '../../docs/issueLabelsOptions.js';

export const Label = ({ title }) => {
  const [labelColor, setLabelColor] = useState('bg-red-600');

  useEffect(() => {
    issueLabelsOptions.map((option) => {
      if (option.value === title) setLabelColor(option.color);
    });
  }, []);

  return (
    <li
      className={`inline-block h-4 leading-[15px] relative bottom-[2px] px-2 ml-2 rounded-[3px] text-xs text-white ${labelColor}`}
    >
      {title}
    </li>
  );
};

Label.propTypes = {
  title: PropTypes.string,
};
