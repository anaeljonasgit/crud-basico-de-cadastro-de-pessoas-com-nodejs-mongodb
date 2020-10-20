const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const Database = require('./Database/Database');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/Pages', express.static(__dirname+'/Pages'));
app.use('/Libs', express.static(__dirname+'/Libs'));

app.use('/api/pessoas', require('./Routes/Pessoas'));

app.get('/', (req, res) => {
	res.sendFile(__dirname+'/Pages/Index/index.html');
});

app.listen(process.env.PORT || 3030, () => {
	console.log('Servidor online.');
});

// CRUD BÁSICO CRIADO PARA ARQUITETURA ESCALÁVEL.
// ANAEL JONAS (anaeljonas@outlook.com).