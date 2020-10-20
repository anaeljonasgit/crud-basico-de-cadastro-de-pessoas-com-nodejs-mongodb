const $ = (element) => {
	return document.querySelector(element);
}

const Pessoas = $('#Pessoas');

function GetPessoas() {
	axios.get('api/pessoas')
		.then(response => {
			if (!response.data.erro) {
				RenderizarPessoas(response.data);
			
				if (response.data == ''){
					$('#Menssage').innerHTML = `Nenhuma pessoa cadastrada`;
				} else {
					$('#Menssage').innerHTML = `Pessoas cadastradas no sistema<br>(Clique para editar):`;
				}
			}
		}).catch(erro => {
			console.log(erro);
		});
}; GetPessoas();

function RenderizarPessoas(response) {
	Pessoas.innerHTML = '';

	response.map(pessoa => {
		Pessoas.innerHTML += `
			<div id='${pessoa._id}' class="Pessoa">
				<div>
					<h3><span onclick="EditarPessoa('${pessoa._id}', 'nome')">${pessoa.nome}</span><span onclick="EditarPessoa('${pessoa._id}', 'idade')">(${pessoa.idade} anos)</span></h3>
					<h5 onclick="EditarPessoa('${pessoa._id}', 'email')">${pessoa.email}</h5>
					<p onclick="EditarPessoa('${pessoa._id}', 'status')">${pessoa.status}</p>
				</div>
				<div>
					<button onclick="DeletarPessoa('${pessoa._id}')">Deletar</button>
				</div>
			</div>
		`;
	});
}

function EditarPessoa(id, key) {
	value = prompt(`Novo valor para ${key}:`);
	if (!value) return null;

	axios.put('api/pessoas/update', {
			_id: id, key, value
		}).then(response => {
			if (!response.data.erro) {
				GetPessoas();
			} else {
				alert(response.data.erro);
			}
		}).catch(erro => {
			console.log(erro);
		});
}

function DeletarPessoa(id) {
	if (confirm('Tem certeza que deseja deletar essa pessoa do sistema?')) {
		axios.delete(`api/pessoas/delete/${id}`)
			.then(response => {
				if (response.data.sucesso) {
					GetPessoas();
				} else{
					alert(response.data.erro);
				}
			}).catch(erro => {
				console.log(erro);
			});
	}
}

function CadastrarPessoa() {
	nome = $('#nome').value;
	email = $('#email').value;
	idade = $('#idade').value;
	status = $('#status').value;

	axios.post('api/pessoas/create', {
			nome, email, idade, status
		}).then(response => {
				if (!response.data.erro) {
					GetPessoas();

					$('#nome').value = '';
					$('#email').value = '';
					$('#idade').value = 20;
					$('#status').value = '';
				} else {
					alert(response.data.erro);
				}
			}).catch(erro => {
				console.log(erro);
			});
}

function VerificarIdade() {
	if ($('#idade').value < 1) {
		$('#idade').value = 1;
	}
}