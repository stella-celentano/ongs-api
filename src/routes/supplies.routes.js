const express = require('express')

const SuppliesController = require('./../controllers/SuppliesController');

const routes = express.Router();

routes.get('', SuppliesController.index);
routes.get('/:id', SuppliesController.show);
routes.post('', SuppliesController.create);
routes.put('/:id', SuppliesController.update);
routes.delete('/:id', SuppliesController.delete);

module.exports = routes;
