const express = require('express');
const router = express.Router();
const db = require('../config/connectionDatabase');

router.get('/:id_unidade', async (req, res) => {
    const { id_unidade } = req.params;

    try {
        const [rows] = await db.execute(
            "SELECT id_sala, tipo_sala, disponivel_sala FROM salas WHERE id_unidade = ?",
            [id_unidade]
        );

        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro ao buscar salas" });
    }
});

module.exports = router;