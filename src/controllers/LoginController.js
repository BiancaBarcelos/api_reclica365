const Usuario = require("../models/Usuario")
const { compareSync, hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const yup = require('yup');

class LoginController {
    async login(request, response) {
        const schema = yup.object().shape({
            email: yup.string().email().required('O campo email é obrigatório'),
            senha: yup.string().required('O campo senha é obrigatório')
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
            const dados = request.body;
            const usuario = await Usuario.findOne({
                where: {
                    email: dados.email
                }
            });

            if (!usuario) {
                return response
                    .status(404)
                    .json({ mensagem: 'Conta não encontrada' });
            }
            
            const validatePassword = compareSync(dados.senha, usuario.senha);
            
            if (!validatePassword) {
                return response
                    .status(401)
                    .json({ mensagem: 'O Email ou a senha estão incorretos' });
            }

            const token = sign({
                id: usuario.id
            },
                process.env.DB_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            response.json({
                token: token,
                nome: usuario.nome
            });

        } catch (error) {
            if (error.name === 'ValidationError') {
                return response.status(400).json({ mensagem: 'Erro na validação', errors: error.errors });
            }
            response.status(500).json({ mensagem: 'Erro ao realizar login' });
        }
    }
}

module.exports = new LoginController()