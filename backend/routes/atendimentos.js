const express = require("express");
const router = express.Router();
const atendimentosController = require("../controller/atendimentos");

router.get("/:id_unidade", atendimentosController.getAtendimentosPorUnidade);
router.post("/", atendimentosController.postNovoAtendimento);
router.put("/:id_atendimento", atendimentosController.updateAtendimento);
router.delete("/:id_atendimento", atendimentosController.deleteAtendimento);

module.exports = router;