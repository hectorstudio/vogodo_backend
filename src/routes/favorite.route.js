const express = require('express');
const controller = require('../controllers/property.controller');
const { authorize } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/save')
  .post(authorize(), controller.saveAsFavorite);

router
  .route('/save/:uid')
  .get(authorize(), controller.getFavoritesByOwnerId);

router
  .route('/favor/:uid')
  .get(authorize(), controller.getFavorites);

module.exports = router;
