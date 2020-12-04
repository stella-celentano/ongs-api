const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/upload');

const OngsController = require('./../controllers/OngsController');

const routes = express.Router();

routes.post('', multer(multerConfig).array('file'), OngsController.create);
routes.post('/getOngData', OngsController.index);
routes.post('/login', OngsController.login);
routes.put('/:id', OngsController.update);
routes.delete('/:id', OngsController.delete);

module.exports = routes;