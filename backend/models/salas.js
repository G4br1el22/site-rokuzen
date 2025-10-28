const db = require("../config/connectionDatabase")

const Salas = {
    //Create
    createSala: (tipo_sala, disponivel_sala, id_unidade, callback)=>{
        db.query("INSERT INTO salas (tipo_sala, disponivel_sala, id_unidade) VALUES (?, ?, ?);", [tipo_sala, disponivel_sala, id_unidade], callback)
    },

    //Read
    getSalasPorUnidadesID: (id_unidade, callback)=>{
        db.query("SELECT s.tipo_sala, s.disponivel_sala FROM salas s JOIN unidades u ON s.id_unidade = u.id_unidade WHERE u.id_unidade = ?;", [id_unidade], callback)
    },
    
    //Update
    updateDisponibilidade: (disponivel_sala, id_sala, callback)=>{
        db.query("UPDATE salas SET disponivel_sala = ? WHERE id_sala = ?;", [disponivel_sala, id_sala], callback)
    },

};

module.exports = Salas;