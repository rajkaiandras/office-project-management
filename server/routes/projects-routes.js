const express = require('express');
const router = express.Router();

const inputValidation = require('../models/input-validation.js');

const jwtAuth = require('../middleware/jwt-auth.js');

const projectsControllers = require('../controllers/projects-controllers.js');

// projects routes
router.get('/', projectsControllers.gettingProjectsController);
router.get('/search', projectsControllers.gettingSearchResultsController);
router.get('/:pid', projectsControllers.gettingProjectByIdController);
router.get('/issues/:uid', projectsControllers.gettingIssuesByUserIdController);

// jwt auth middleware
router.use(jwtAuth);

router.post(
  '/create',
  inputValidation.creatingProjectValidation,
  projectsControllers.creatingProjectController
);
router.patch(
  '/:pid',
  // inputValidation.updatingProjectValidation,
  projectsControllers.updatingProjectByIdController
);

module.exports = router;
