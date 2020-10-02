const express = require('express');

const AnimalsController = require('./../controllers/AnimalsController');

const routes = express.Router();

routes.post('/createAnimals', AnimalsController.create);
routes.get('/getAnimals', AnimalsController.index);
routes.put('/updateAnimals/:id', AnimalsController.update);
routes.delete('/deleteAnimals/:id', AnimalsController.delete);

module.exports = routes;