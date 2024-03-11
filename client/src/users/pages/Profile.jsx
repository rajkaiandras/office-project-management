import { PageTitle } from '../../shared/components/UIElements/PageTitle';
import { ImageUpload } from '../../shared/components/formElements/ImageUpload';

export const Profile = () => {
  const inputHandler = () => {};

  return (
    <section className="w-full max-w-7xl p-4 m-auto">
      <PageTitle title={'Profile Page'} />

      <ImageUpload center id="image" onInput={inputHandler} />

      <ul>
        <li className="ml-4">
          FIX: After pick image, update profile image in Avatar
        </li>
        <li className="ml-4">Edit personal information</li>
        <li className="ml-4">
          Change password - old/new password (last 3 password)
        </li>

        <li className="ml-4">Delete account</li>
      </ul>
    </section>
  );
};
