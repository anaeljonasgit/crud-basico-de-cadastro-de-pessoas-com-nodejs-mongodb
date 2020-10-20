const mongoose = require('mongoose');

const Pessoa = require('../../Schemas/Pessoa');

async function VerifyEmail(email) {
	EmailAlreadyExists = await Pessoa.find({ email });
	if (EmailAlreadyExists != '') return { erro: 'E-mail já em uso.' }

	VerifiedEmailConditions = {
		arroba: false,
		ponto: false,
		quantityArrobas: 0
	}

	for (verify in email) {
		if (email[verify] == '@' && (verify != 0 && email.length-1)) {
			VerifiedEmailConditions.arroba = true;
			VerifiedEmailConditions.quantityArrobas += 1;
		
		} else if (email[verify] == '.' && VerifiedEmailConditions.arroba) {
			VerifiedEmailConditions.ponto = true;
		}
	}

	if (VerifiedEmailConditions.arroba && VerifiedEmailConditions.ponto && VerifiedEmailConditions.quantityArrobas == 1 && email.length >= 5){
		return { sucesso: 'E-mail disponível.' };
	} else{
		return { erro: 'E-mail inválido.' }
	}
}

module.exports = VerifyEmail;