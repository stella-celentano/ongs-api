const express = require('express');

const OngsController = require('./../controllers/OngsController');

const routes = express.Router();

routes.post('/createOng', OngsController.create);
routes.get('/getOngs', OngsController.index);
routes.put('/updateOng/:id', OngsController.update);
routes.delete('/deleteOng/:id', OngsController.delete);

module.exports = routes;