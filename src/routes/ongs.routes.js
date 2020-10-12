const express = require('express');

const OngsController = require('./../controllers/OngsController');

const routes = express.Router();

routes.post('', OngsController.create);
routes.get('', OngsController.index);
routes.put('/:id', OngsController.update);
routes.delete('/:id', OngsController.delete);

module.exports = routes;