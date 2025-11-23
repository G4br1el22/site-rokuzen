const express = require("express");
const router = express.Router();
const listas = require("../controller/listas");

router.get("/clientes", listas.getClientes);
router.get("/colaboradores/:id_unidade", listas.getColaboradores);
router.get("/salas/:id_unidade", listas.getSalas);
router.get("/servicos", listas.getServicos);
router.get("/unidades", listas.getUnidades);
router.post("/novoAgendamento", listas.createAtendimento);

module.exports = router;