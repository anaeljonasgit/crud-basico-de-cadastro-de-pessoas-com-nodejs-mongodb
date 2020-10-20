const mongoose = require('mongoose');

const Pessoa = require('../../Schemas/Pessoa');
const VerifyEmail = require('./VerifyEmail');

async function Update(req) {
	_id = req._id;
	key = req.key;
	value = req.value;

	if (!_id || !key || !value) {
		return { erro: 'Dados insuficientes.' }
	} else {
		if (key == '_id') {
			return { erro: 'Opção inválida.' }
		}
	}

	if (key == 'email') {
		VerifiedEmail = await VerifyEmail(value);
		if (!VerifiedEmail.sucesso) {
			return VerifiedEmail;
		}
	}

	Update = await Pessoa.updateOne({ _id }, { [key]: value })
		.then(response => {
			if (response.ok) {
				return { sucesso: 'Dado alterado com sucesso!' }
			} else{
				return { erro: 'Opção inválida.' }
			}
		}).catch(erro => {
			return { erro: erro }
		});

	return Update;
}

module.exports = Update;