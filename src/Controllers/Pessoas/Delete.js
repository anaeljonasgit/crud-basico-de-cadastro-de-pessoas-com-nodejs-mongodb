const mongoose = require('mongoose');

const Pessoa = require('../../Schemas/Pessoa');

async function Delete(params) {
	_id = params._id;

	if (!_id) {
		return { erro: 'Dados insuficientes.' }
	}

	Delete = await Pessoa.deleteOne({ _id })
		.then(response => {
			if (response.deletedCount) {
				return { sucesso: 'Pessoa deletada com sucesso!' }
			} else {
				return { erro: 'Não foi possível deletar essa pessoa.' }
			}
		}).catch(erro => {
			return { erro: 'Não foi possível deletar essa pessoa.' }
		});

	return Delete;
}

module.exports = Delete;