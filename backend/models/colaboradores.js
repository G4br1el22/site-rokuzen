const db = require("../config/connectionDatabase")

const Colaboradores = {
    //Create
    postNovoColaborador: (nome_colaborador, tipo_colaborador, id_unidade, callback) =>{
        db.query("INSERT INTO colaboradores (nome_colaborador, tipo_colaborador, id_unidade) VALUES (?, ?, ?);", [nome_colaborador, tipo_colaborador, id_unidade], callback)
    },

    //Read
    getEscalaColaboradorPorID: (id_colaborador ,callback) =>{
        db.query("SELECT c.nome_colaborador, e.inicio_escala, e.fim_escala FROM colaboradores c JOIN escalas e ON c.id_colaborador = e.id_colaborador WHERE c.id_colaborador = ?;", [id_colaborador],callback)
    },
    
    getEscalaFranquiasPorId: (id_unidade, callback) =>{
        db.query("SELECT c.nome_colaborador, e.inicio_escala, e.fim_escala FROM colaboradores c JOIN escalas e ON c.id_colaborador = e.id_colaborador JOIN unidades u ON c.id_unidade = u.id_unidade WHERE u.id_unidade = ?", [id_unidade], callback)
    },

    getAcessoMassagistas: (callback) =>{
        db.query("SELECT c.nome_colaborador, id_colaborador FROM colaboradores c WHERE c.tipo_colaborador = 'massagista';", callback)    //Email: nome do colaborador       Senha: ID do colaborador
    },

    getAcessoRecepcao: (callback) =>{
        db.query("SELECT c.nome_colaborador, id_colaborador FROM colaboradores c WHERE c.tipo_colaborador = 'recepcionista';", callback)
    },

    getAcessoADM: (callback) =>{
        db.query("SELECT c.nome_colaborador, id_colaborador FROM colaboradores c WHERE c.tipo_colaborador = 'administrador';", callback)
    },
    //Update
    updateTipoColaboradorPorID: (tipo_colaborador, id_colaborador, callback) =>{
        db.query("UPDATE colaboradores SET tipo_colaborador= ? WHERE id_colaborador = ?", [tipo_colaborador, id_colaborador], callback)
    },

    updateUnidadeDoColaborador: (id_unidade, id_colaborador, callback) =>{
        db.query("UPDATE colaboradores SET id_unidade= ? WHERE id_colaborador = ?", [id_unidade, id_colaborador], callback)
    },
    //Delete
    deleteColaborador: (id_colaborador, callback)=>{
        db.query("DELETE FROM colaboradores WHERE id_colaborador = ?", [id_colaborador], callback) 
    },

};

module.exports = Colaboradores;