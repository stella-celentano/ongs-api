const express = require('express')

const SuppliesController = require('./../controllers/SuppliesController');

const routes = express.Router();

routes.post('', SuppliesController.create);
routes.get('', SuppliesController.index);
routes.put('/:id', SuppliesController.update);
routes.delete('/:id', SuppliesController.delete);

module.exports = routes;
