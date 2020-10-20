const mongoose = require('mongoose');

const PessoaSchema = mongoose.Schema({
	nome: String,
	idade: Number,
	email: String,
	status: String,
	adm: {
		type: Boolean,
		default: false
	}
});

const Pessoa = mongoose.model('pessoas', PessoaSchema);

module.exports = Pessoa;