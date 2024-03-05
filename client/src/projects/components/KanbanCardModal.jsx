import { useState, useContext } from 'react';
import { createPortal } from 'react-dom';

import { v4 as uuidv4 } from 'uuid';
import { formatDistanceToNow } from 'date-fns';

import Select from 'react-select';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { AuthContext } from '../../contexts/auth-context.jsx';

import { issueLabelsOptions } from '../../docs/issueLabelsOptions';

export const KanbanCardModal = ({
  issue,
  assignedTo,
  updateIssue,
  deleteIssue,
  handleModalClose,
}) => {
  const auth = useContext(AuthContext);
  const [lead, setLead] = useState(issue.lead?._id || {});
  const [priority, setPriority] = useState(issue.priority || '');
  const [labels, setLabels] = useState(
    issue.labels?.map((label) => {
      return { value: label, label: label };
    }) || []
  );
  const [note, setNote] = useState('');

  const handleTitleChange = (e) => {
    updateIssue(
      issue.id,
      e.target.value,
      issue.description,
      issue.labels,
      issue.priority,
      issue.lead,
      issue.notes
    );
  };

  const handleDescriptionChange = (e) => {
    updateIssue(
      issue.id,
      issue.title,
      e.target.value,
      issue.labels,
      issue.priority,
      issue.lead,
      issue.notes
    );
  };

  const handleLabelsChange = (choices) => {
    let labels = choices.map((label) => Object.values(label)[0]);

    setLabels(choices);
    updateIssue(
      issue.id,
      issue.title,
      issue.description,
      labels,
      issue.priority,
      issue.lead,
      issue.notes
    );
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
    updateIssue(
      issue.id,
      issue.title,
      issue.description,
      issue.labels,
      e.target.value,
      issue.lead,
      issue.notes
    );
  };

  const handleLeadChange = (e) => {
    setLead(e.target.value);

    updateIssue(
      issue.id,
      issue.title,
      issue.description,
      issue.labels,
      issue.priority,
      assignedTo.filter((user) => user._id === e.target.value)[0],
      issue.notes
    );
  };

  const handleAddNote = (e) => {
    e.preventDefault();

    let newNote = {
      id: uuidv4(),
      creator: auth.state.user,
      content: note,
      createdAt: new Date(),
    };

    let newNotes = !issue.notes ? [newNote] : [...issue.notes, newNote];

    updateIssue(
      issue.id,
      issue.title,
      issue.description,
      issue.labels,
      issue.priority,
      issue.lead,
      newNotes
    );

    setNote('');
  };

  const handleIssueDelete = () => {
    deleteIssue(issue.id);
  };

  const content = (
    <div className="fixed top-1/2 left-1/2 z-50 p-4 w-[480px] rounded-md -translate-x-1/2 -translate-y-1/2 bg-slate-600">
      <header>
        <h2 className="mb-4 text-center text-white">Kanban Card Modal</h2>
        <XMarkIcon
          className="absolute top-4 right-4 h-6 w-6 text-red-600 cursor-pointer"
          onClick={handleModalClose}
        />
      </header>
      <form>
        <label>Title</label>
        <input
          className="p-2 w-full"
          value={issue.title}
          onChange={(e) => handleTitleChange(e)}
        />
        <label>Description</label>
        <textarea
          className="p-2 w-full rounded-md"
          value={issue.description}
          onChange={(e) => handleDescriptionChange(e)}
        >
          {issue.description}
        </textarea>
        <label>Issue lead</label>
        <select
          className="p-2 w-full rounded-md"
          value={lead}
          onChange={(e) => handleLeadChange(e)}
        >
          <option>- Select issue lead -</option>
          {assignedTo.map((assignedUser) => {
            return (
              <option key={assignedUser._id} value={assignedUser._id}>
                {`${assignedUser.firstName} ${assignedUser.lastName}`}
              </option>
            );
          })}
        </select>
        <label>Priority</label>
        <select
          className="p-2 w-full rounded-md"
          value={priority}
          onChange={(e) => handlePriorityChange(e)}
        >
          <option>- Select priority -</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
        </select>
        <label>Labels</label>
        <Select
          defaultValue={[]}
          value={labels}
          isMulti
          name="labels"
          options={issueLabelsOptions}
          onChange={(choices) => handleLabelsChange(choices)}
          className="basic-multi-select"
          classNamePrefix="select"
        />

        <label>Notes</label>
        <ul className="h-[128px] overflow-auto">
          {issue.notes &&
            issue.notes.map((note) => {
              return (
                <li className="mb-2" key={note.id}>
                  <div className="flex justify-between">
                    <span className="text-blue-500">
                      by {note.creator.lastName}
                    </span>
                    <span className="text-slate-500">
                      {formatDistanceToNow(new Date(note.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div className="text-white">{note.content}</div>
                </li>
              );
            })}
        </ul>
        <textarea
          className="p-2 w-full rounded-md"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <button onClick={handleAddNote}>Add note</button>

        <button className="w-full bg-red-500" onClick={handleIssueDelete}>
          DELETE
        </button>
      </form>
    </div>
  );

  return createPortal(content, document.getElementById('modal-portal'));
};

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { CSSTransition } from 'react-transition-group';

// import Backdrop from './Backdrop';
// import './Modal.css';

// const ModalOverlay = (props) => {
//   const content = (
//     <div className={`modal ${props.className}`} style={props.style}>
//       <header className={`modal__header ${props.headerClass}`}>
//         <h2>{props.header}</h2>
//       </header>
//       <form
//         onSubmit={
//           props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
//         }
//       >
//         <div className={`modal__content ${props.contentClass}`}>
//           {props.children}
//         </div>
//         <footer className={`modal__footer ${props.footerClass}`}>
//           {props.footer}
//         </footer>
//       </form>
//     </div>
//   );
//   return ReactDOM.createPortal(content, document.getElementById('modal-portal'));
// };

// const Modal = (props) => {
//   return (
//     <React.Fragment>
//       {props.show && <Backdrop onClick={props.onCancel} />}
//       <CSSTransition
//         in={props.show}
//         mountOnEnter
//         unmountOnExit
//         timeout={200}
//         classNames="modal"
//       >
//         <ModalOverlay {...props} />
//       </CSSTransition>
//     </React.Fragment>
//   );
// };

// export default Modal;
