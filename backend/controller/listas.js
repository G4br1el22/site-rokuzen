const db = require("../config/connectionDatabase");

module.exports = {
  // CLIENTES
  getClientes: async (req, res) => {
    try {
      const [rows] = await db.execute("SELECT id_cliente, nome_cliente FROM clientes");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // COLABORADORES POR UNIDADE
  getColaboradores: async (req, res) => {
    try {
      const [rows] = await db.execute(
        `SELECT id_colaborador, nome_colaborador 
         FROM colaboradores 
         WHERE tipo_colaborador = 'massagista'`
      );
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // SALAS POR UNIDADE
  getSalas: async (req, res) => {
    try {
      const [rows] = await db.execute(
        `SELECT id_sala, tipo_sala FROM salas`
      );
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // SERVIÇOS
  getServicos: async (req, res) => {
    try {
      const [rows] = await db.execute("SELECT id_servico, tipo_servico FROM servicos");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // UNIDADES
  getUnidades: async (req, res) => {
    try {
      const [rows] = await db.execute("SELECT id_unidade, nome_unidade FROM unidades");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  
  createAtendimento: async (req, res) => {
    try {
      console.log("RECEBIDO NO BACKEND:", req.body);

      const { 
        data,
        inicio,
        fim,
        pagamento,
        id_servico,
        id_cliente,
        id_colaborador,
        id_sala,
        id_unidade
      } = req.body;

      // Junta data + hora no formato do MySQL
      const inicio_atendimento = `${data} ${inicio}:00`;
      const fim_atendimento = `${data} ${fim}:00`;

      const [resultado] = await db.execute(
        `INSERT INTO atendimentos 
        (inicio_atendimento, fim_atendimento, pagamento, id_servico, id_cliente, id_colaborador, id_sala, id_unidade)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          inicio_atendimento,
          fim_atendimento,
          pagamento,
          id_servico,
          id_cliente,
          id_colaborador,
          id_sala,
          id_unidade
        ]
      );

      res.json({
        message: "Atendimento criado com sucesso!",
        id_atendimento: resultado.insertId
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },


};