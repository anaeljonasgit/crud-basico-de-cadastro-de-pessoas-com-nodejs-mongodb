const mongoose = require('mongoose');

const Pessoa = require('../../Schemas/Pessoa');

async function Get() {
	Get = await Pessoa.find()
		.then(response => {
			return response
		}).catch(erro => {
			return { erro: erro }
		});

	return Get;
}

module.exports = Get;