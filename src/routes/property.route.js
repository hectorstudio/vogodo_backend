const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/property.controller');
const { authorize } = require('../middlewares/auth');
const {
  Property
} = require('../validations/Property.validation');

const upload = require('../config/upload');

const router = express.Router();

router
  .route('/')
  .get(controller.getProperties);

router
  .route('/own')
  .get(authorize(), controller.getPropertiesByOwnerId);

router
  .route('/:id')
  .get(authorize(), controller.getProperty);

router
  .route('/')
  .post(authorize(), validate(Property), controller.addNewProperty);

router.post('/:id', upload.single('file'), authorize(), controller.updateProperty);

module.exports = router;
