const express = require('express');

const AnimalsController = require('./controllers/AnimalsController');

const routes = express.Router();

routes.post('/animals', AnimalsController.create);
routes.get('/animals', AnimalsController.index);
routes.put('/animals/:id', AnimalsController.update);
routes.delete('/animals/:id', AnimalsController.delete);

module.exports = routes;