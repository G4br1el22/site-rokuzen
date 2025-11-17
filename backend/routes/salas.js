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

router.get('/agendamentos/:id_unidade', async (req, res) => {
    const { id_unidade } = req.params;

    const sql = `
        SELECT a.id_sala, a.inicio_atendimento, a.fim_atendimento, s.tipo_sala FROM atendimentos a JOIN salas s ON s.id_sala = a.id_sala WHERE s.id_unidade = ? AND NOW() BETWEEN a.inicio_atendimento AND a.fim_atendimento
    `;

    try {
        const [rows] = await db.execute(sql, [id_unidade]);
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erro ao buscar agendamentos" });
    }
});

module.exports = router;