const express = require('express');
const cors = require('cors');
const Colaboradores = require('../backend/models/colaboradores');

const app = express();
app.use(cors()); // permite que o front acesse o back
app.use(express.json());

// Rota para buscar escalas por unidade
app.get('/escala-massagistas', async (req, res) => {
  try {
    const escalas = [];

    for (let id_uni = 1; id_uni <= 4; id_uni++) {
      const resultado = await Colaboradores.getEscalaMassagistasPorIdUnidade(id_uni);

      escalas.push({
        id_unidade: id_uni,
        escala: resultado
      });
    }

    res.json(escalas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar escalas' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
