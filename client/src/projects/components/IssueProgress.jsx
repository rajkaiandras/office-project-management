import PropTypes from 'prop-types';

export const IssuesProgress = ({ projectData }) => {
  return (
    <section className="w-full max-w-[640px] p-4 mb-6 rounded-xl bg-slate-900 ">
      <h1 className="mb-4 font-bold">Issues Progress</h1>
      <table className="text-center table-fixed w-[640px]">
        <thead className="">
          <tr className="text-white ">
            <th>Backlog</th>
            <th>Scheduled</th>
            <th>In Progress</th>
            <th>In Review</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>25%</td>
            <td>42%</td>
            <td className="text-blue-600 font-bold">21%</td>
            <td>7%</td>
            <td className="text-green-600 font-bold">5%</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

IssuesProgress.propTypes = {
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
        fullName: PropTypes.string,
      })
    ),
    priority: PropTypes.string,
  }),
};
