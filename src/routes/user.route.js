const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/user.controller');
const { authorize } = require('../middlewares/auth');
const {
  login
} = require('../validations/user.validation');

const router = express.Router();

router
  .route('/:id')
  .get(authorize(), controller.getUser);

router
  .route('/:id')
  .put(authorize(), controller.updateUser);

router
  .route('/login')
  .post(validate(login), controller.login);

module.exports = router;
