import { DashboardProjectsList } from '../../components/DashboardProjectsList';
import { AssignedIssuesList } from '../../components/AssignedIssuesList';
import { PageTitle } from '../../../shared/components/UIElements/PageTitle';
import { HorizontalDivider } from '../../../shared/components/UIElements/HorizontalDivider';

export const Dashboard = () => {
  return (
    <section className="w-full mx-auto max-w-7xl p-4">
      <PageTitle title={'Dashboard'} />

      <HorizontalDivider />

      <DashboardProjectsList />

      <HorizontalDivider />

      <AssignedIssuesList />
    </section>
  );
};
