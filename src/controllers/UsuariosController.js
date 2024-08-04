const Usuario = require('../models/Usuario')
const yup = require('yup')
const { Op } = require('sequelize');
const PontoColeta = require('../models/PontoColeta');


class UsuariosController {
    async register(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required('O campo Nome é obrigatório.'),
            sexo: yup.string().oneOf(['feminino', 'masculino', 'outro']).required('O campo Sexo é obrigatório.'),
            cpf: yup.string().length(11, 'O campo CPF deve ter 11 caracteres.').required('O campo CPF é obrigatório.'),
            senha: yup.string().required('O campo Senha é obrigatório.'),
            email: yup.string().email().required('O campo Email é obrigatório.'),
            data_de_nascimento: yup.date().required('O campo Data de nascimento é obrigatório.'),
            cep: yup.string().required('O campo CEP é obrigatório.'),
            logradouro: yup.string().required('O campo Logradouro é obrigatório.'),
            numero: yup.number().required('O campo Número é obrigatório.'),
            complemento: yup.string(),
            bairro: yup.string().required('O campo Bairro é obrigatório.'),
            cidade: yup.string().required('O campo Cidade é obrigatório.'),
            estado: yup.string().required('O campo Estado é obrigatório.')
        });

        try {
            await schema.validate(req.body, { abortEarly: false });

            const usuarioExistente = await Usuario.findOne({
                where: {
                    [Op.or]: [
                        { cpf: req.body.cpf },
                        { email: req.body.email }
                    ]
                }
            });

            if (usuarioExistente) {
                return res.status(400).json({
                    mensagem: 'O campo Email ou CPF já cadastrados.'
                });
            }

            const usuario = await Usuario.create(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            if (error.name === 'ValidationError') {
                res.status(400).json({ mensagem: 'Erro', errors: error.errors });
            } else {
                res.status(500).json({ mensagem: 'Erro ao cadastrar o usuário.', error });
            }
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id);
            const pontosColetaUsuario = await PontoColeta.findOne({where: {usuario_id:id}})
            
            if (!usuario) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
            }
            if(!pontosColetaUsuario){
                await usuario.destroy();
                return res.status(200).json({mensagem: 'Usuário removido com sucesso!'});
            }else{
                return res.status(401).json({mensagem: 'Não é possível remover o usuário pois ele contém locais de coleta vinculados'})
            }
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao deletar usuário.', error });
        }
    }

}

module.exports = new UsuariosController()