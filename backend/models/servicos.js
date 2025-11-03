const db = require("../config/connectionDatabase");

const Servicos = {
    //Create 
    createServico: async(tipo_servico, preco_servico, tempo_servico, pontuacao)=>{
        try{
            const [resposta] = await db.execute("INSERT INTO servicos (tipo_servico, preco_servico, tempo_servico, pontuacao)VALUES (?, ?, ?, ?);", [tipo_servico, preco_servico, tempo_servico, pontuacao])
            return resposta
        }catch(e){
            throw new Error(`Erro ao criar serviços: ${e.message}`);
        }
    },
    
    //Read
    getServicos: async(tipo_servico, preco_servico, tempo_servico, pontuacao) =>{
        try{
            const [linhas] = await db.execute("SELECT tipo_servico, preco_servico, tempo_servico, pontuacao FROM servicos", [tipo_servico, preco_servico, tempo_servico, pontuacao])
            return linhas
        }catch(e){
            throw new Error(`Erro ao buscar por serviços: ${e.message}`);
        }
    },

    //Update
    updateServicos: async(tipo_servico, preco_servico, tempo_servico, pontuacao, id_servico)=>{
        try{
            const [resposta] = await db.execute("UPDATE servicos SET tipo_servico = ?, preco_servico = ?, tempo_servico = ?, pontuacao = ? WHERE id_servico = ?", [tipo_servico, preco_servico, tempo_servico, pontuacao, id_servico])
            return resposta
        }catch(e){
            throw new Error(`Erro ao atualizar serviços: ${e.message}`);
        }
    },
    //Delete
    deleteServicos: async(id_servico)=>{
        try{
            const [resposta] = await db.execute("DELETE FROM servicos WHERE id_servico = ?", [id_servico])
            return resposta
        }catch(e){
            throw new Error(`Erro ao deletar serviços: ${e.message}`);
        }
    },
    
}

module.exports = Servicos;