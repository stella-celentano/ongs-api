const express = require('express');

const AnimalsController = require('./controllers/AnimalsController');
const SuppliesController = require('./controllers/SuppliesController');
const OngsController = require('./controllers/AnimalsController');

const routes = express.Router();

routes.post('/supplies', SuppliesController.create);
routes.get('/supplies', SuppliesController.index);
routes.put('/supplies/:id', SuppliesController.update);
routes.delete('/supplies/:id', SuppliesController.delete);

routes.post('/animals', AnimalsController.create);
routes.get('/animals', AnimalsController.index);
routes.put('/animals/:id', AnimalsController.update);
routes.delete('/animals/:id', AnimalsController.delete);

routes.post('/ongs', OngsController.create);
routes.get('/ongs', OngsController.index);
routes.put('/ongs/:id', OngsController.update);
routes.delete('/ongs/:id', OngsController.delete);

module.exports = routes;