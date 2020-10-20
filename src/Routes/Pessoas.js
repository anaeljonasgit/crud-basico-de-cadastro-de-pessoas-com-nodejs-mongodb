const express = require('express');
const router = express.Router();

// /api/pessoas/

const Get = require('../Controllers/Pessoas/Get');
const Create = require('../Controllers/Pessoas/Create');
const Delete = require('../Controllers/Pessoas/Delete');
const Update = require('../Controllers/Pessoas/Update');

router.get('/', async (req, res) => {
	res.send(await Get());
});

router.post('/create', async (req, res) => {
	res.send(await Create(req.body));
});

router.delete('/delete/:_id', async (req, res) => {
	res.send(await Delete(req.params));
});

router.put('/update', async (req, res) => {
	res.send(await Update(req.body));
});

module.exports = router;