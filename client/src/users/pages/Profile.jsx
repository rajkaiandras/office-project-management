import { PageTitle } from '../../shared/components/UIElements/PageTitle';

export const Profile = () => {
  return (
    <section className="w-full max-w-7xl p-4 m-auto">
      <PageTitle title={'Profile Page'} />

      <ul>
        <li className="ml-4">Upload profile image</li>
        <li className="ml-4">Edit personal information</li>
        <li className="ml-4">
          Change password - old/new password (last 3 password)
        </li>

        <li className="ml-4">Delete account</li>
      </ul>
    </section>
  );
};
