const { Router } = require('express')
const  ColetaController = require('../controllers/PontoColetaController')

const ColetasRoutes = new Router()

ColetasRoutes.get('/:usuario_id', (req,res)=>ColetaController.listar(req,res));
ColetasRoutes.get('/detalhes/:local_id', (req,res) =>ColetaController.detalhesPontoColeta(req,res));
ColetasRoutes.delete('/:local_id',(req,res)=>ColetaController.remover(req,res));
ColetasRoutes.post('/',(req,res)=>ColetaController.register(req,res));
ColetasRoutes.put('/:local_id',(req,res)=>ColetaController.editar(req,res));

module.exports = ColetasRoutes