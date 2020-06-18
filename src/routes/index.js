const express = require('express');
const userRoute = require('./user.route');
const propertyRoute = require('./property.route');
const geoRoute = require('./geo.route');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));
router.use('/user', userRoute);
router.use('/property', propertyRoute);
router.use('/geo', geoRoute);

module.exports = router;
