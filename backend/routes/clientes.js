const express = require("express");
const router = express.Router();
const cliente = require('../controller/clientes')

router.post("/novoCliente", cliente.postClientes);

module.exports = router;