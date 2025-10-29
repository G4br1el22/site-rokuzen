const db = require("../config/connectionDatabase")

const Salas = {
    //Create
    createSala: async(tipo_sala, disponivel_sala, id_unidade)=>{
        try{
            const [resposta] = await db.execute("INSERT INTO salas (tipo_sala, disponivel_sala, id_unidade) VALUES (?, ?, ?);", [tipo_sala, disponivel_sala, id_unidade])
            return resposta
        }catch(e){
            throw new Error(`Erro ao criar sala: ${e.message}`);
        }
    },

    //Read
    getSalasPorUnidadesID: async(id_unidade)=>{
        try{
            const [linhas] = await db.execute("SELECT s.tipo_sala, s.disponivel_sala FROM salas s JOIN unidades u ON s.id_unidade = u.id_unidade WHERE u.id_unidade = ?;", [id_unidade])
            return linhas
        }catch(e){
            throw new Error(`Erro ao buscar sala: ${e.message}`);
        }
    },
    
    //Update
    updateDisponibilidade: async(disponivel_sala, id_sala)=>{
        try{
            const [resposta] = await db.execute("UPDATE salas SET disponivel_sala = ? WHERE id_sala = ?;", [disponivel_sala, id_sala])
            return resposta
        }catch(e){
            throw new Error(`Erro ao atualizar status de sala: ${e.message}`);
        }
    },

};

module.exports = Salas;