import { createPortal } from 'react-dom';

export const Backdrop = ({ onClick }) => {
  return createPortal(
    <div
      className="backdrop fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-75 backdrop-blur-[2px] z-10"
      onClick={onClick}
    ></div>,
    document.getElementById('backdrop-portal')
  );
};
