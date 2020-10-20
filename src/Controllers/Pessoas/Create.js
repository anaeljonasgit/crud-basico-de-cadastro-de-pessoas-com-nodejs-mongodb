const mongoose = require('mongoose');

const Pessoa = require('../../Schemas/Pessoa');
const VerifyEmail = require('./VerifyEmail');

async function Create(req) {
	nome = req.nome;
	idade = req.idade;
	email = req.email;
	status = req.status;

	if (!nome || !idade || !email || !status){
		return { erro: 'Dados insuficientes.' }
	}

	VerifiedEmail = await VerifyEmail(email);
	if (VerifiedEmail.sucesso) {
		Create = await Pessoa.create({
				nome,
				idade,
				email,
				status
			}).then(response => {
				return { sucesso: 'Pessoa cadastrada com sucesso!' }
			}).catch(erro => {
				return { erro: erro }
			});

		return Create;
	} else {
		return VerifiedEmail;
	}
}

module.exports = Create;