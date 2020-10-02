const express = require('express')

const SuppliesController = require('./../controllers/SuppliesController');

const routes = express.Router();

routes.post('/createSupplies', SuppliesController.create);
routes.get('/getSupplies', SuppliesController.index);
routes.put('/updateSupplies/:id', SuppliesController.update);
routes.delete('/deleteSupplies/:id', SuppliesController.delete);

module.exports = routes;
