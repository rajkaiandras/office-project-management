import PropTypes from 'prop-types';
import { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';

import { UpdateProjectRequest } from '../../services/UpdateProjectRequest';

import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';

// import PlusIcon from '../../assets/icons/PlusIcon';

const defaultColumns = [
  {
    id: 'backlog',
    title: 'BACKLOG',
  },
  {
    id: 'scheduled',
    title: 'SCHEDULED',
  },
  {
    id: 'progress',
    title: 'IN PROGRESS',
  },
  {
    id: 'review',
    title: 'IN REVIEW',
  },
  {
    id: 'done',
    title: 'DONE',
  },
];

// const initialissues = [
//   {
//     id: '1',
//     columnId: 'backlog',
//     content: 'List admin APIs for dashboard',
//   },
//   {
//     id: '2',
//     columnId: 'backlog',
//     content:
//       'Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation',
//   },
//   {
//     id: '3',
//     columnId: 'scheduled',
//     content: 'Conduct security testing',
//   },
//   {
//     id: '4',
//     columnId: 'scheduled',
//     content: 'Analyze competitors',
//   },
//   {
//     id: '5',
//     columnId: 'scheduled',
//     content: 'Create UI kit documentation',
//   },
//   {
//     id: '6',
//     columnId: 'progress',
//     content: 'Dev meeting',
//   },
//   {
//     id: '7',
//     columnId: 'progress',
//     content: 'Deliver dashboard prototype',
//   },
//   {
//     id: '8',
//     columnId: 'review',
//     content: 'Optimize application performance',
//   },
//   {
//     id: '9',
//     columnId: 'done',
//     content: 'Implement data validation',
//   },
//   {
//     id: '10',
//     columnId: 'done',
//     content: 'Design database schema',
//   },
// ];

export const KanbanBoard = ({ projectData }) => {
  const [columns, setColumns] = useState(defaultColumns);
  const [activeColumn, setActiveColumn] = useState(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [issues, setIssues] = useState(projectData.issues);
  const [assignedTo, setAssignedTo] = useState(projectData.assignedTo);
  const latestIssues = useRef();
  latestIssues.current = issues;
  const [activeIssue, setActiveIssue] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const {
    updateProject,
    // isUpdateProjectRequestPending,
    // isUpdateProjectRequestSuccess,
    // updateProjectRequestError,
  } = UpdateProjectRequest();

  useEffect(() => {
    return () => {
      updateProject(projectData._id, latestIssues.current);
    };
  }, []);

  const createIssue = (columnId) => {
    const newIssue = {
      id: uuidv4(),
      columnId,
      title: '',
      description: '',
      labels: [],
      priority: '',
      lead: {},
      notes: [],
    };

    setIssues([...issues, newIssue]);
  };

  const deleteIssue = (id) => {
    const newIssues = issues.filter((issue) => issue.id !== id);
    setIssues(newIssues);
  };

  const updateIssue = (
    id,
    title,
    description,
    labels,
    priority,
    lead,
    notes
  ) => {
    const newIssues = issues.map((issue) => {
      if (issue.id !== id) return issue;

      return {
        ...issue,
        title,
        description,
        labels,
        priority,
        lead,
        notes,
      };
    });

    setIssues(newIssues);
  };

  return (
    <section className="mb-16">
      <div
        className="
        flex
        pb-[40px]
        mt-[40px]
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
      "
      >
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="m-auto flex gap-4">
            <div className="flex gap-4">
              <SortableContext items={columnsId}>
                {columns.map((col) => (
                  <KanbanColumn
                    key={col.id}
                    column={col}
                    // deleteColumn={deleteColumn}
                    // updateColumn={updateColumn}
                    issues={issues.filter((issue) => issue.columnId === col.id)}
                    assignedTo={assignedTo}
                    createIssue={createIssue}
                    updateIssue={updateIssue}
                    deleteIssue={deleteIssue}
                  />
                ))}
              </SortableContext>
            </div>
            {/* <button
            onClick={() => {
              createNewColumn();
            }}
            className="
              h-[60px]
              w-[350px]
              min-w-[350px]
              cursor-pointer
              rounded-lg
              bg-mainBackgroundColor
              border-2
              border-columnBackgroundColor
              p-4
              ring-rose-500
              hover:ring-2
              flex
              gap-2
            "
          >
            <PlusIcon />
            Add Column
          </button> */}
          </div>

          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <KanbanColumn
                  column={activeColumn}
                  // deleteColumn={deleteColumn}
                  // updateColumn={updateColumn}
                  createIssue={createIssue}
                  deleteIssue={deleteIssue}
                  updateIssue={updateIssue}
                  issues={issues.filter(
                    (issue) => issue.columnId === activeColumn.id
                  )}
                />
              )}
              {activeIssue && (
                <KanbanCard
                  issue={activeIssue}
                  deleteIssue={deleteIssue}
                  updateIssue={updateIssue}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </section>
  );

  // function createNewColumn() {
  //   const columnToAdd = {
  //     id: generateId(),
  //     title: `Column ${columns.length + 1}`,
  //   };

  //   setColumns([...columns, columnToAdd]);
  // }

  // function deleteColumn(id) {
  //   const filteredColumns = columns.filter((col) => col.id !== id);
  //   setColumns(filteredColumns);

  //   const newissues = issues.filter((t) => t.columnId !== id);
  //   setissues(newissues);
  // }

  // function updateColumn(id, title) {
  //   const newColumns = columns.map((col) => {
  //     if (col.id !== id) return col;
  //     return { ...col, title };
  //   });

  //   setColumns(newColumns);
  // }

  function onDragStart(event) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Issue') {
      setActiveIssue(event.active.data.current.issue);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveIssue(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === 'Column';
    if (!isActiveAColumn) return;

    console.log('DRAG END');

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAIssue = active.data.current?.type === 'Issue';
    const isOverAIssue = over.data.current?.type === 'Issue';

    if (!isActiveAIssue) return;

    // Im dropping a Issue over another Issue
    if (isActiveAIssue && isOverAIssue) {
      setIssues((issues) => {
        const activeIndex = issues.findIndex((t) => t.id === activeId);
        const overIndex = issues.findIndex((t) => t.id === overId);

        if (issues[activeIndex].columnId != issues[overIndex].columnId) {
          // Fix introduced after video recording
          issues[activeIndex].columnId = issues[overIndex].columnId;
          return arrayMove(issues, activeIndex, overIndex - 1);
        }

        return arrayMove(issues, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    // Im dropping a Issue over a column
    if (isActiveAIssue && isOverAColumn) {
      setIssues((issues) => {
        const activeIndex = issues.findIndex((t) => t.id === activeId);

        issues[activeIndex].columnId = overId;
        console.log('DROPPING ISSUE OVER COLUMN', { activeIndex });
        return arrayMove(issues, activeIndex, activeIndex);
      });
    }
  }
};

KanbanBoard.propTypes = {
  projectData: PropTypes.shape({
    _id: PropTypes.string,
    projectName: PropTypes.string,
    projectDetails: PropTypes.string,
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
    priority: PropTypes.string,
  }),
  // deleteColumn: PropTypes.func,
  // updateColumn: PropTypes.func,
  // createIssue: PropTypes.func,
  // updateIssue: PropTypes.func,
  // deleteIssue: PropTypes.func,
};
