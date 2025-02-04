const express = require('express')
const  Router = express.Router();
const {Handle_Post_Request , Handle_Get_Request} = require('../Controller/Controller');

Router.post('/' , Handle_Post_Request);
Router.get('/:id' , Handle_Get_Request);


module.exports = Router;