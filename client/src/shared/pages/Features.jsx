import React from 'react';

import { PageTitle } from '../components/UIElements/PageTitle';
import { SectionTitle } from '../components/UIElements/SectionTitle';

export const Features = () => {
  return (
    <React.Fragment>
      <PageTitle title={'Main Features of the OFFICE'} />

      <article className="mb-8">
        <SectionTitle title={'Authentication and authorization'} />

        <ul>
          <li className="ml-4">Sing Up new user</li>
          <li className="ml-4">Log In existing user</li>
          <li className="ml-4">
            Forget Password - send email with temporary credentials
          </li>
          <li className="ml-4">
            JSON Web Token - secure url safe authorization
          </li>
          <li className="ml-4">
            Log In - 3rd party login (via Google platform)
          </li>
        </ul>
      </article>

      <article className="mb-8">
        <SectionTitle title={'Project'} />

        <ul>
          <li className="ml-4">Create new project</li>
          <li className="ml-4">Update, close, delete existing project</li>
          <li className="ml-4">Assign project to developer</li>
          <li className="ml-4">Track project progress</li>
          <li className="ml-4">Filter Projects by Developer</li>
        </ul>
      </article>

      <article className="mb-8">
        <SectionTitle title={'Issues'} />

        <ul>
          <li className="ml-4">Add new issue to board</li>
          <li className="ml-4">Edit issue details modal</li>
          <li className="ml-4">Add note to issue</li>
        </ul>
      </article>

      <article className="mb-8">
        <SectionTitle title={'Online users'} />

        <ul>
          <li className="ml-4">Display Active/Online Users - websocket</li>
        </ul>
      </article>

      <article className="mb-8">
        <SectionTitle title={'Search'} />

        <ul>
          <li className="ml-4">Search in projects</li>
          <li className="ml-4">Search in issues</li>
        </ul>
      </article>

      <article className="mb-8">
        <SectionTitle title={'Profile Page'} />

        <ul>
          <li className="ml-4">Upload profile image</li>
          <li className="ml-4">Edit personal information</li>
          <li className="ml-4">
            Change password - old/new password (last 3 password)
          </li>

          <li className="ml-4">Delete account</li>
        </ul>
      </article>
    </React.Fragment>
  );
};
