import PropTypes from 'prop-types';
import { useState } from 'react';

import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

import { KanbanCardModal } from './KanbanCardModal';

import { PencilSquareIcon } from '@heroicons/react/24/solid';

import { Backdrop } from '../../shared/components/UIElements/Backdrop';

export const KanbanCard = ({ issue, assignedTo, updateIssue, deleteIssue }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isKanbanCardModalOpen, setIsKanbanCardModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsKanbanCardModalOpen(true);
  };

  const handleModalClose = () => {
    setIsKanbanCardModalOpen(false);
    setEditMode(false);
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: issue.id,
    data: {
      type: 'Issue',
      issue,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-blue-600 cursor-grab relative"
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-red-500 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-blue-600 cursor-grab relative"
      >
        <textarea
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
          value={issue.title}
          autoFocus
          placeholder="Issue title..."
          onBlur={isKanbanCardModalOpen ? null : toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) =>
            updateIssue(issue.id, e.target.value, issue.description, issue.lead)
          }
        />

        {isKanbanCardModalOpen && (
          <KanbanCardModal
            issue={issue}
            assignedTo={assignedTo}
            updateIssue={updateIssue}
            deleteIssue={deleteIssue}
            handleModalClose={handleModalClose}
          />
        )}
        {isKanbanCardModalOpen && <Backdrop onClick={handleModalClose} />}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="bg-slate-900 text-white p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-blue-600 cursor-grab relative issue"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      {/* <div className="bg-red-600 w-1 rounded h-full"></div> */}
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {!issue.title ? (
          <span className="text-blue-600">New issue title...</span>
        ) : (
          issue.title
        )}
      </p>

      {mouseIsOver && (
        // <button
        //   onClick={() => {
        //     deleteTask(task.id);
        //   }}
        //   className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
        // >
        //   <TrashIcon />

        // </button>
        <button
          onClick={() => {
            // deleteTask(task.id);
            handleModalOpen();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 opacity-60 hover:opacity-100 border-none"
        >
          <PencilSquareIcon className="h-6 w-6 text-slate-600" />
        </button>
      )}
    </div>
  );
};

KanbanCard.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.string,
    columnId: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    lead: PropTypes.object,
  }),
  assignedTo: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    })
  ),
  updateIssue: PropTypes.func,
  deleteIssue: PropTypes.func,
};
