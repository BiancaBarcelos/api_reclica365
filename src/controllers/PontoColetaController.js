const PontoColeta = require('../models/PontoColeta')
const yup = require('yup')

class PontoColetaController {
    async register(req, res) {
        const schema = yup.object().shape({
            usuario_id: yup.number().required('nao foi informado um identificador de usuário'),
            nome: yup.string().required('Este campo é obrigatório'),
            descricao: yup.string(),
            logradouro: yup.string().required('Este campo é obrigatório'),
            numero: yup.number().required('Este campo é obrigatório'),
            complemento: yup.string(),
            bairro: yup.string().required('Este campo é obrigatório'),
            cidade: yup.string().required('Este campo é obrigatório'),
            estado: yup.string().required('Este campo é obrigatório'),
            cep: yup.string().required('Este campo é obrigatório'),
            latitude: yup.number(),
            longitude: yup.number(),
            url_google_maps: yup.string()
        });

        try {
            await schema.validate(req.body, {abortEarly:false});

            const pontoColeta = await PontoColeta.create(req.body);
            res.status(201).json({mensagem:'Ponto de coleta cadastrado com sucesso!', pontoColeta})
        } catch (error) {
            if (error.name === 'ValidationError') {
                res.status(400).json({ mensagem: 'Erro', errors: error.errors });
            } else {
                res.status(500).json({ mensagem: 'Erro ao cadastrar o usuário.', error });
            }
        }
    }
    async editar(req, res) {
        try {
            const {local_id} = req.params;
            const novoDadoPontoColeta = req.body;
            
            const pontoColetaAtualizado = await PontoColeta.update(novoDadoPontoColeta, 
                {
                    where:{
                        id:local_id,
                        usuario_id:novoDadoPontoColeta.usuario_id
                    }
                }
            )

            if(!!pontoColetaAtualizado[0]){
                return res.status(200).json({mensagem:'Ponto de coleta atualizado com sucesso!'})
            }else{
                return res.status(401).json({mensagem: 'Usuário não autorizado a realizar essa ação'})
            }

        } catch (error) {
            res.status(500).json({mensagem: 'Erro ao realizar ação', error})
        }
    }
    async remover(req, res) {
        try {
            const {local_id} = req.params;
            const pontoColeta = await PontoColeta.findByPk(local_id);

            await pontoColeta.destroy();
            res.status(204).send().json({mensagem: 'Ponto de coleta removido com sucesso!'});

        }catch(error){
            return res.status(500).json({mensagem: 'Erro ao deletar ponto de coleta.', error})
        }
    }
    async listar(req,res) {
        try {
            const {usuario_id} = req.params;
            const pontosColeta = await PontoColeta.findAll({where:{usuario_id:usuario_id}})
            if(pontosColeta.length){
                return res.status(200).json({pontosColeta})
            }else{
                return res.status(401).json({mensagem: 'Usuário não autorizado'})
            }
        } catch (error) {
            res.status(500).json({mensagem: 'Erro ao tentar listar os pontos de coleta', error})
        }
    }
    async detalhesPontoColeta(req,res) {
        try {
            const {local_id} = req.params;
            const {usuario_id} = req.body
            const pontoColeta = await PontoColeta.findOne({where:{id:local_id,usuario_id:usuario_id}})
            return res.status(200).json({pontoColeta})
        } catch (error) {
            
        }
    }
}

module.exports = new PontoColetaController()