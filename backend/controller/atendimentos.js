const Atendimentos = require("../models/atendimentos");

const atendimentosController = {
  // GET: lista de agendamentos por unidade
  getAtendimentosPorUnidade: async (req, res) => {
    try {
      const { id_unidade } = req.params;
      const lista = await Atendimentos.getInformacoesPorIdUnidade(id_unidade);
      res.json(lista);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // POST: cria novo agendamento
  postNovoAtendimento: async (req, res) => {
    try {
      const {
        inicio_atendimento,
        fim_atendimento,
        pagamento,
        id_servico,
        id_cliente,
        id_colaborador,
        id_sala,
        id_unidade,
      } = req.body;

      const resposta = await Atendimentos.postNovoAtendimento(
        inicio_atendimento,
        fim_atendimento,
        pagamento,
        id_servico,
        id_cliente,
        id_colaborador,
        id_sala,
        id_unidade
      );

      res.status(201).json({ success: true, id: resposta.insertId });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // PUT: editar
  updateAtendimento: async (req, res) => {
    try {
      const { id_atendimento } = req.params;
      const {
        inicio_atendimento,
        fim_atendimento,
        pagamento,
        id_servico,
        id_cliente,
        id_colaborador,
        id_sala,
        id_unidade,
      } = req.body;

      await Atendimentos.updateAtendimento(
        inicio_atendimento,
        fim_atendimento,
        pagamento,
        id_servico,
        id_cliente,
        id_colaborador,
        id_sala,
        id_unidade,
        id_atendimento
      );
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // DELETE: apagar
  deleteAtendimento: async (req, res) => {
    try {
      const { id_atendimento } = req.params;
      await Atendimentos.deleteAtendimento(id_atendimento);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },
};

module.exports = atendimentosController;