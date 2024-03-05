import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { KanbanCard } from './KanbanCard';

import PlusIcon from '../../assets/icons/PlusIcon';
// import TrashIcon from '../../assets/icons/TrashIcon';

export const KanbanColumn = ({
  column,
  // deleteColumn,
  // updateColumn,
  issues,
  assignedTo,
  createIssue,
  updateIssue,
  deleteIssue,
}) => {
  // const [editMode, setEditMode] = useState(false);
  const issuesIds = useMemo(() => {
    return issues.map((issue) => issue.id);
  }, [issues]);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    // disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
          bg-columnBackgroundColor
          opacity-40
          border-2
          bg-pink-500
          w-[350px]
          h-[500px]
          max-h-[500px]
          rounded-md
          flex
          flex-col
        "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
      "
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        // onClick={() => {
        //   setEditMode(true);
        // }}
        className="
          text-md
          text-white
          h-[60px]
          rounded-md
          rounded-b-none
          p-3
          font-bold
          border-slate-600
          border-2
          flex
          items-center
          justify-between
          bg-slate-900
        "
      >
        <div className="flex gap-2">
          {/* <div
            className="
              flex
              justify-center
              items-center
              bg-red-500
              px-2
              py-1
              text-sm
              rounded-full
            "
          >0</div> */}
          {column.title}
          {/* {editMode && (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              // onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditMode(false);
              }}
            />
          )} */}
        </div>
        {/* <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="
          stroke-gray-500
          hover:stroke-white
            hover:bg-columnBackgroundColor
            rounded
            px-1
            py-2
          "
        >
          <TrashIcon />
        </button> */}
      </div>

      {/* Column issue container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto ">
        <SortableContext items={issuesIds}>
          {issues.map((issue) => (
            <KanbanCard
              key={issue.id}
              issue={issue}
              assignedTo={assignedTo}
              updateIssue={updateIssue}
              deleteIssue={deleteIssue}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      {column.id === 'backlog' && (
        <button
          className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor bg-slate-900 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
          onClick={() => {
            createIssue(column.id);
          }}
        >
          <PlusIcon />
          Add issue
        </button>
      )}
    </div>
  );
};

KanbanColumn.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      columnId: PropTypes.string,
      content: PropTypes.string,
    })
  ),
  assignedTo: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    })
  ),
  // updateColumn: PropTypes.func,
  // deleteColumn: PropTypes.func,
  createIssue: PropTypes.func,
  updateIssue: PropTypes.func,
  deleteIssue: PropTypes.func,
};
