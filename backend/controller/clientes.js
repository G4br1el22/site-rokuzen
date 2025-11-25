const Clientes = require('../models/clientes');

const clientesController = {
    postClientes: async (req, res) =>{
        try {
            const {nome_cliente, email_cliente, telefone_cliente, data_nasc} = req.body;
            const resposta = await Clientes.createCliente(nome_cliente, email_cliente, telefone_cliente, data_nasc);
            res.status(201).json({ success: true, id: resposta.insertId });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
};

module.exports = clientesController;