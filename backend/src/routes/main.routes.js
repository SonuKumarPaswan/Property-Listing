const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const propertyRoutes = require('./property.routes');
const  officeRoutes= require('./office.routes');

const { route } = require('../app');
const { createOffice } = require('../controllers/office.controller');

// user routes
router.use('/api/users', userRoutes);
router.use('/api/properties', propertyRoutes);
router.use(`/api/office`, officeRoutes)


module.exports = router;
