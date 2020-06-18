const express = require('express');
const controller = require('../controllers/geo.controller');
const { authorize } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(controller.getStates);

router
  .route('/:id')
  .get(controller.getCitiesById);
  
module.exports = router;