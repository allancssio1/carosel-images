const express = require('express')
const Route = express.Router()
const Images = require('./app/Controllers/ControllerImages')
const Users = require('./app/Controllers/ControllerUsers')
const multer = require('./app/middlewares/multer')

Route.get('/', Users.index)
Route.get('/user/create', Users.create)
Route.get('/user/entre', Users.login)
Route.get('/user/:id/edit', Users.edit)
Route.get('/user/:id', Users.show)
Route.post('/user', Users.post)
Route.post('/user/:id/entre', Users.entre)
Route.put('/user', Users.put)
Route.delete('/user', Users.delete)

Route.post('/photos', multer.array('photos', 50), Images.post)
Route.delete('/photos', multer.array('photos', 50), Images.delete)

module.exports = Route