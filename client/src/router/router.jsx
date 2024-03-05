import { RootLayout } from '../shared/pages/RootLayout.jsx';
import { AuthLayout } from '../users/pages/AuthLayout.jsx';
import { ProjectsLayout } from '../projects/pages/ProjectsLayout.jsx';
import { Features } from '../shared/pages/Features.jsx';
import { LogIn } from '../users/pages/log-in-page/LogIn.jsx';
import { SignUp } from '../users/pages/sign-up-page/SignUp.jsx';
import { Dashboard } from '../projects/pages/dashboard-page/Dashboard.jsx';
import { ProjectPage } from '../projects/pages/project-page/ProjectPage.jsx';
import { ProjectsListPage } from '../projects/pages/projects-list-page/ProjectsListPage.jsx';
import { EditProjectPage } from '../projects/pages/edit-project-page/EditProjectPage.jsx';
import { CreateProjectPage } from '../projects/pages/create-project-page/CreateProjectPage.jsx';
import { Profile } from '../users/pages/Profile.jsx';
import { ErrorPage } from '../shared/pages/ErrorPage.jsx';
import { ProjectPageBoard } from '../projects/components/ProjectPageBoard.jsx';

export const publicRoutes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Features />,
      },
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <LogIn />,
          },
          {
            path: '/auth/signup',
            element: <SignUp />,
          },
        ],
      },
    ],
  },
];

export const privateRoutes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Features />,
      },
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <LogIn />,
          },
          {
            path: '/auth/signup',
            element: <SignUp />,
          },
        ],
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/projects',
        element: <ProjectsLayout />,
        children: [
          {
            index: true,
            element: <ProjectsListPage />,
          },
          {
            path: '/projects/:pid',
            element: <ProjectPage />,
            children: [
              {
                index: true,
                element: <ProjectPageBoard />,
              },
              {
                path: '/projects/:pid/edit',
                element: <EditProjectPage />,
              },
            ],
          },
          {
            path: '/projects/create',
            element: (
              <CreateProjectPage
                editMode={{ isActive: false, projectData: null }}
              />
            ),
          },
        ],
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
];

// const publicRoutes = [
//   {
//     path: '/features',
//     element: <Features />,
//   },
//   {
//     path: '/auth/login',
//     element: <LogIn />,
//   },
//   {
//     path: '/auth/signup',
//     element: <SignUp />,
//   },
//   {
//     path: '/dashboard',
//     element: <Dashboard />,
//   },
//   {
//     path: '/projects/',
//     element: <ProjectsListPage />,
//   },
//   {
//     path: '/projects/:pid',
//     element: <ProjectPage />,
//   },
//   {
//     path: '/projects/create',
//     element: <CreateProject />,
//   },
// ];

// const privateRoutes = [
//   {
//     index: true,
//     path: '/features',
//     element: <Features />,
//   },
//   {
//     path: '/auth/login',
//     element: <LogIn />,
//   },
//   {
//     path: '/auth/signup',
//     element: <SignUp />,
//   },
//   {
//     path: '/dashboard',
//     element: <Dashboard />,
//   },
//   {
//     path: '/projects/',
//     element: <ProjectsListPage />,
//   },
//   {
//     path: '/projects/:pid',
//     element: <ProjectPage />,
//   },
//   {
//     path: '/projects/create',
//     element: <CreateProject />,
//   },
//   {
//     path: '/profile',
//     element: <Profile />,
//   },
// ];
