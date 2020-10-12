const express = require('express');

const AnimalsController = require('./../controllers/AnimalsController');

const routes = express.Router();

routes.post('', AnimalsController.create);
routes.get('', AnimalsController.index);
routes.put('/:id', AnimalsController.update);
routes.delete('/:id', AnimalsController.delete);

module.exports = routes;