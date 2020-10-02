const express = require('express');

const AnimalsController = require('./controllers/AnimalsController');
const SuppliesController = require('./controllers/SuppliesController');

const routes = express.Router();

routes.post('/supplies', SuppliesController.create);
routes.get('/supplies', SuppliesController.index);
routes.put('/supplies/:id', SuppliesController.update);
routes.delete('/supplies/:id', SuppliesController.delete);

routes.post('/animals', AnimalsController.create);
routes.get('/animals', AnimalsController.index);
routes.put('/animals/:id', AnimalsController.update);
routes.delete('/animals/:id', AnimalsController.delete);

module.exports = routes;