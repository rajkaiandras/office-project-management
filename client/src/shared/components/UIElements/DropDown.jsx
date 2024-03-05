import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ChevronDownIcon } from '@heroicons/react/24/solid';

export const DropDown = ({ title, items }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="relative">
      {open ? (
        <button className="p-0 border-none text-blue-600" onClick={handleOpen}>
          {title}
          <ChevronDownIcon className="inline-block w-4 h-4 ml-2 text-blue-600" />
        </button>
      ) : (
        <button className="p-0 border-none " onClick={handleOpen}>
          {title}
          <ChevronDownIcon className="inline-block w-4 h-4 ml-2 text-slate-600" />
        </button>
      )}

      {open && (
        <ul className="absolute top-8 p-2 w-[120px] border-[2px] border-slate-600 rounded-sm bg-slate-800">
          {items.map((item) => (
            <li key={item.title} onClick={handleOpen}>
              <Link to={item.link}>
                <button className="p-0 border-none hover:text-blue-600">
                  {item.title}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

DropDown.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
};
