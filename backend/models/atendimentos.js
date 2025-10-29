const db = require("../config/connectionDatabase");

const Atendimentos = {
    //Create
    postNovoAtendimento: async(inicio_atendimento, fim_atendimento, pagamento, id_servico, id_cliente, id_colaborador, id_sala, id_unidade) =>{
        try{
            const [resposta] = await db.execute("INSERT INTO atendimentos (inicio_atendimento, fim_atendimento, pagamento, id_servico, id_cliente, id_colaborador, id_sala, id_unidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [inicio_atendimento, fim_atendimento, pagamento, id_servico, id_cliente, id_colaborador, id_sala, id_unidade])
            return resposta
        }catch(e){
            throw new Error(`Erro ao criar atendimento: ${e.message}`);
        }
    },

    //Read
    getInformacoesPorIdUnidade: async(id_unidade) => {
        try{
            const [linhas] = await db.execute("SELECT a.inicio_atendimento, a.fim_atendimento, a.pagamento, s.tipo_servico AS servico, c.nome_cliente AS cliente, col.nome_colaborador AS colaborador, sa.tipo_sala AS sala, u.nome_unidade AS unidade FROM atendimentos a JOIN servicos s ON a.id_servico = s.id_servico JOIN clientes c ON a.id_cliente =c.id_cliente JOIN colaboradores col ON a.id_colaborador = col.id_colaborador JOIN salas sa ON a.id_sala = sa.id_sala JOIN unidades u ON a.id_unidade = u.id_unidade WHERE a.id_unidade = ?;", [id_unidade])
            return linhas
        }catch(e){
            throw new Error(`Erro ao buscar atendimentos: ${e.message}`);
        }
    },

    getInformacoesPorIdColaborador: async(id_colaborador) => {
        try{
            const [linhas] = await db.execute("SELECT a.inicio_atendimento, a.fim_atendimento, a.pagamento, s.tipo_servico AS servico, c.nome_cliente AS cliente, col.nome_colaborador AS colaborador, sa.tipo_sala AS sala, u.nome_unidade AS unidade FROM atendimentos a JOIN servicos s ON a.id_servico = s.id_servico JOIN clientes c ON a.id_cliente =c.id_cliente JOIN colaboradores col ON a.id_colaborador = col.id_colaborador JOIN salas sa ON a.id_sala = sa.id_sala JOIN unidades u ON a.id_unidade = u.id_unidade WHERE a.id_colaborador = ?;", [id_colaborador])
            return linhas
        }catch(e){
            throw new Error(`Erro ao buscar atendimentos por colaborador: ${e.message}`);
        }
    },

    //Update
    updateAtendimento: async(inicio_atendimento, fim_atendimento, pagamento, id_servico, id_cliente, id_colaborador, id_sala, id_unidade, id_atendimento) => {
    try{
        const [resposta] = await db.execute("UPDATE atendimentos SET inicio_atendimento=?, fim_atendimento=?, pagamento=?, id_servico=?, id_cliente=?, id_colaborador=?, id_sala=?, id_unidade=? WHERE id_atendimento=?;", [inicio_atendimento, fim_atendimento, pagamento, id_servico, id_cliente, id_colaborador, id_sala, id_unidade, id_atendimento])
        return resposta
    }catch(e){
        throw new Error(`Erro ao atualizar atendimentos: ${e.message}`);
    }
    },

    //Delete
    deleteAtendimento: async(id_atendimento) => {
    try{
        const [resposta] = await db.execute("DELETE FROM atendimentos WHERE id_atendimento = ?", [id_atendimento])
        return resposta
    }catch(e){
        throw new Error(`Erro ao deletar atendimentos: ${e.message}`);
    }
    },

};

module.exports = Atendimentos;