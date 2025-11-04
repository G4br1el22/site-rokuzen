const db = require("../config/connectionDatabase")

//Create
const createCliente = async(nome_cliente, email_cliente, telefone_cliente, data_nasc) =>{
    try{
        const [resposta] = await db.execute("INSERT INTO clientes (nome_cliente, email_cliente, telefone_cliente, data_nasc) VALUES (?, ?, ?, ?);", [nome_cliente, email_cliente, telefone_cliente, data_nasc])
        return resposta
    }catch(e){
        throw new Error(`Erro ao criar clientes: ${e.message}`);
    }
};

//Read
const getLoginCliente = async(email_cliente, telefone_cliente)=>{
    try{
        const [linha] = await db.execute("SELECT c.email_cliente, c.telefone_cliente FROM clientes c WHERE c.email_cliente = ? AND c.telefone_cliente = ?;", [email_cliente, telefone_cliente])
        return linha[0] || null
    }
    catch(e){
        throw new Error(`Erro ao acessar clientes: ${e.message}`);
    }
};

const getAniversario = async(email_cliente)=>{
    try{
        const [linha] = await db.execute("SELECT data_nasc FROM clientes WHERE email_cliente = ?;", [email_cliente])
        return linha[0] || null
    }
    catch(e){
        throw new Error(`Erro ao acessar aniversário dos clientes: ${e.message}`);
    }
};
//Update
const updateCliente = async(nome_cliente, email_cliente, telefone_cliente, data_nasc, id_cliente)=>{
    try{
        const [resposta] = await db.execute("UPDATE clientes SET nome_cliente = ?, email_cliente = ?, telefone_cliente = ?, data_nasc = ? WHERE id_cliente = ?;", [nome_cliente, email_cliente, telefone_cliente, data_nasc, id_cliente])
        return resposta
    }
    catch(e){
        throw new Error(`Erro ao atualizar clientes: ${e.message}`);
    }
};
//Delete
const deleteCliente = async(id_cliente)=>{
    try{
        const [resposta] = await db.execute("DELETE FROM clientes WHERE id_cliente = ?", [id_cliente])
        return resposta
    }
    catch(e){
        throw new Error(`Erro ao deletar clientes: ${e.message}`);
    }
};

module.exports = {getLoginCliente, getAniversario, createCliente, updateCliente, deleteCliente};