const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/upload');

const AnimalsController = require('./../controllers/AnimalsController');

const routes = express.Router();

routes.post('', multer(multerConfig).array('file') ,AnimalsController.create);
routes.get('', AnimalsController.index);
routes.put('/:id', AnimalsController.update);
routes.delete('/:id', AnimalsController.delete);

module.exports = routes;