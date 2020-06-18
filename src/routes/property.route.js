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

router.post('/', upload.single('file'), authorize(), controller.addNewProperty);

router
  .route('/own')
  .get(authorize(), controller.getPropertiesByOwnerId);

router
  .route('/:id')
  .get(authorize(), controller.getProperty);

router
  .route('/:id')
  .put(authorize(), validate(Property), controller.updateProperty);

module.exports = router;
