const { Router } = require('express')
const UsuariosRoutes = require('./usuarios.routes')
const LoginController = require('../controllers/LoginController')
const ColetasRoutes = require('./coleta.routes')

const routes = new Router()

routes.use('/usuario', UsuariosRoutes)
routes.post('/login', LoginController.login)
routes.use('/local', ColetasRoutes)


module.exports = routes