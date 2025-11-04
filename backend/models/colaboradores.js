const db = require("../config/connectionDatabase")


//Create
const postNovoColaborador = async(nome_colaborador, tipo_colaborador, id_unidade) =>{
    try{
        const [resposta] = await db.execute("INSERT INTO colaboradores (nome_colaborador, tipo_colaborador, id_unidade) VALUES (?, ?, ?);", [nome_colaborador, tipo_colaborador, id_unidade])
        return resposta
    }catch(e){
        throw new Error(`Erro ao criar colaboradores: ${e.message}`);
    }
};

//Read
const getEscalaMassagistasPorIdUnidade = async(id_unidade) =>{
    try{
        const [linhas] = await db.execute("SELECT c.nome_colaborador, e.inicio_escala, e.fim_escala FROM colaboradores c JOIN escalas e ON c.id_colaborador = e.id_colaborador JOIN unidades u ON c.id_unidade = u.id_unidade WHERE u.id_unidade = ? and c.tipo_colaborador = 'massagista';", [id_unidade])
        return linhas
    }catch(e){
        throw new Error(`Erro ao buscar escalas: ${e.message}`);
    }
};

const getAcessoMassagistas = async() =>{
    try{
        const [linhas] = await db.execute("SELECT c.nome_colaborador, id_colaborador FROM colaboradores c WHERE c.tipo_colaborador = 'massagista';")    //Email: nome do colaborador       Senha: ID do colaborador
        return linhas
    }catch(e){
        throw new Error(`Erro ao buscar acesso massagista: ${e.message}`);
    }
};

const getAcessoRecepcao = async() =>{
    try{
        const [linhas] = await db.execute("SELECT c.nome_colaborador, id_colaborador FROM colaboradores c WHERE c.tipo_colaborador = 'recepcionista';")
        return linhas
    }catch(e){
        throw new Error(`Erro ao buscar acesso recepção: ${e.message}`);
    }
};

const getAcessoADM = async() =>{
    try{
        const [linhas] = await db.execute("SELECT c.nome_colaborador, id_colaborador FROM colaboradores c WHERE c.tipo_colaborador = 'administrador';")
        return linhas
    }catch(e){
        throw new Error(`Erro ao buscar acesso ADM: ${e.message}`);
    }
};
//Update
const updateTipoColaboradorPorID = async(tipo_colaborador, id_colaborador) =>{
    try{
        const [resposta] = await db.execute("UPDATE colaboradores SET tipo_colaborador= ? WHERE id_colaborador = ?", [tipo_colaborador, id_colaborador])
        return resposta
    }catch(e){
        throw new Error(`Erro ao atualizar tipo de colaborador: ${e.message}`);
    }
};

const updateUnidadeDoColaborador = async(id_unidade, id_colaborador) =>{
    try{
        const [resposta] = await db.execute("UPDATE colaboradores SET id_unidade= ? WHERE id_colaborador = ?", [id_unidade, id_colaborador])
        return resposta
    }catch(e){
        throw new Error(`Erro ao atualizar unidade de colaborador: ${e.message}`);
    }
};
//Delete
const deleteColaborador = async(id_colaborador)=>{
    try{
        const [resposta] = await db.execute("DELETE FROM colaboradores WHERE id_colaborador = ?", [id_colaborador]) 
        return resposta
    }catch(e){
        throw new Error(`Erro ao deletar colaboradores: ${e.message}`);
    }
};

module.exports = {postNovoColaborador, getAcessoADM, getEscalaMassagistasPorIdUnidade, getAcessoMassagistas, getAcessoRecepcao, updateTipoColaboradorPorID, updateUnidadeDoColaborador, deleteColaborador};