const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error.js');
const Project = require('../models/project-schema.js');

const gettingProjectsController = async (req, res, next) => {
  console.log('GET request in /api/projects - get projects route!');

  try {
    const projects = await Project.find();

    res.json(projects);
  } catch (err) {
    const error = new HttpError(
      'Could not find any projects in the database!',
      404
    );
    return next(error);
  }
};

const gettingProjectByIdController = async (req, res, next) => {
  console.log('GET request in /api/projects/:pid - get project by id route!');

  const projectId = req.params.pid;

  try {
    const project = await Project.findById(projectId);
    res.json(project);
  } catch (err) {
    const error = new HttpError(
      'Could not find project with provided project id!',
      404
    );
    return next(error);
  }
};

const gettingIssuesByUserIdController = async (req, res, next) => {
  console.log(
    'GET request in /api/projects/issues/:uid - get issues by user id route!'
  );

  const userId = req.params.uid;

  try {
    const projects = await Project.find();

    let issues = [];

    projects.map((project) => {
      return project.issues.map((issue) => {
        if (issue.lead?._id === userId) {
          issue.projectId = project._id;
          issues.push(issue);
        }
      });
    });

    res.json(
      !issues.length
        ? { message: 'Could not find issue with provided user id!' }
        : issues
    );
  } catch (err) {
    const error = new HttpError('Getting issues by user id failed!', 500);
    return next(error);
  }
};

const gettingSearchResultsController = async (req, res, next) => {
  console.log(
    'GET request in /api/projects/search?uid=uid&keyw=keyw - get search results by keyword route!'
  );

  const params = new URLSearchParams(req.query);
  const userId = params.get('uid');
  const keyword = params.get('keyw');

  try {
    const projects = await Project.find();

    let projectResults = [];
    let issueResults = [];

    projects.map((project) => {
      project.assignedTo.map((assignedUser) => {
        if (
          project.projectName.toLowerCase().includes(keyword.toLowerCase()) &&
          assignedUser._id === userId
        ) {
          let projectResult = {
            resultName: project.projectName,
            projectId: project._id,
          };

          projectResults.push(projectResult);
        }
      });
    });

    projects.map((project) => {
      project.issues.map((issue) => {
        if (
          issue.title.toLowerCase().includes(keyword.toLowerCase()) &&
          issue.lead._id === userId
        ) {
          let issueResult = {
            resultName: issue.title,
            projectId: project._id,
          };

          issueResults.push(issueResult);
        }
      });
    });

    res.json(
      !projectResults.length && !issueResults.length
        ? {
            message:
              'Could not find any project or issue with provided keyword!',
            projectResults,
            issueResults,
          }
        : { projectResults, issueResults }
    );
  } catch (err) {
    const error = new HttpError('Searching by keyword failed!', 500);
    return next(error);
  }
};

const creatingProjectController = async (req, res, next) => {
  console.log('POST request in /api/projects/create - create project route!');

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const error = new HttpError('Invalid input, please check your data!', 422);
    return next(error);
  }

  const { projectName, projectDetails, dueDate, category, assignedTo, issues } =
    req.body;
  const newProject = new Project({
    projectName,
    projectDetails,
    dueDate,
    category,
    assignedTo,
    issues,
  });

  let projectExists;
  try {
    projectExists = await Project.find({ projectName }).exec();

    if (projectExists.length !== 0) {
      const error = new HttpError(
        `Project with provided name (${projectName}) already exists!`,
        409
      );
      return next(error);
    } else {
      await newProject.save();
      res.status(201).json({
        message: 'Your project has been created!',
        project: newProject,
      });
    }
  } catch (err) {
    const error = new HttpError('Creating new project failed!', 500);
    return next({ err, error });
  }
};

const updatingProjectByIdController = async (req, res, next) => {
  console.log('GET request in /api/projects/:pid - patch project by id route!');

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const error = new HttpError('Invalid input, please check your data!', 422);
    return next(error);
  }

  const projectId = req.params.pid;
  const newIssues = req.body.issues;

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId },
      { issues: newIssues }
    );
    res.json(updatedProject);
  } catch (err) {
    const error = new HttpError(
      'Could not find project with provided project id!',
      404
    );
    return next(error);
  }
};

module.exports = {
  gettingProjectByIdController,
  gettingProjectsController,
  gettingIssuesByUserIdController,
  gettingSearchResultsController,
  creatingProjectController,
  updatingProjectByIdController,
};
