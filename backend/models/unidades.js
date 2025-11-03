const db = require("../config/connectionDatabase")

const Unidades = {
    //Create
    createUnidade: async(nome_unidade)=>{
        try{
            const [resposta] = await db.execute("INSERT INTO unidades (nome_unidade) VALUES (?);", [nome_unidade])
            return resposta
        }catch(e){
            throw new Error(`Erro ao criar unidade: ${e.message}`);
        }
    },

    //Read
    getUnidade: async(id_unidade)=>{
        try{
            const [linhas] = await db.execute("SELECT nome_unidade FROM unidades WHERE id_unidade = ?;", [id_unidade])
            return linhas
        }catch(e){
            throw new Error(`Erro ao buscar unidade: ${e.message}`);
        }
    },

    //Update
    updateUnidade: async(nome_unidade, id_unidade)=>{
        try{
            const [resposta] = await db.execute("UPDATE unidades SET nome_unidade = ? WHERE id_unidade = ?", [nome_unidade, id_unidade])
            return resposta
        }catch(e){
            throw new Error(`Erro ao atualizar unidade: ${e.message}`);
        }
    },

    //Delete
    deleteUnidade: async(id_unidade)=>{
        try{
            const [resposta] = await db.execute("DELETE FROM unidades WHERE id_unidade = ?", [id_unidade])
            return resposta
        }catch(e){
            throw new Error(`Erro ao deletar unidade: ${e.message}`);
        }
    },

}

module.exports = Unidades