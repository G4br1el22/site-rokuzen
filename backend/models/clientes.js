const db = require("../config/connectionDatabase")

const Clientes = {
    //Create
    createCliente: (nome_cliente, email_cliente, telefone_cliente, data_nasc, callback) =>{
        db.query("INSERT INTO clientes (nome_cliente, email_cliente, telefone_cliente, data_nasc) VALUES (?, ?, ?, ?);", [nome_cliente, email_cliente, telefone_cliente, data_nasc], callback)
    },

    //Read
    getLoginCliente: (email_cliente, telefone_cliente, callback)=>{
        db.query("SELECT c.email_cliente, c.telefone_cliente FROM clientes c WHERE c.email_cliente = ? AND c.telefone_cliente = ?;", [email_cliente, telefone_cliente], callback)
    },

    getAniversario: (email_cliente, callback)=>{
        db.query("SELECT data_nasc FROM clientes WHERE email_cliente = ?;", [email_cliente], callback)
    },
    //Update
    updateCliente: (nome_cliente, email_cliente, telefone_cliente, data_nasc, id_cliente, callback)=>{
        db.query("UPDATE clientes SET nome_cliente = ?, email_cliente = ?, telefone_cliente = ?, data_nasc = ? WHERE id_cliente = ?;", [nome_cliente, email_cliente, telefone_cliente, data_nasc, id_cliente], callback)
    },
    //Delete
    deleteCliente: (id_cliente, callback)=>{
        db.query("DELETE FROM clientes WHERE id_cliente = ?", [id_cliente], callback)
    },
};

module.exports = Clientes;