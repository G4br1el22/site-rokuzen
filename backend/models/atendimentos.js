const db = require("../config/connectionDatabase");

const Atendimentos = {
    //Create
    postNovoAtendimento: (inicio_atendimento, fim_atendimento, pagamento, id_servico, id_cliente, id_colaborador, id_sala, id_unidade, callback) =>{
        db.query("INSERT INTO atendimentos (inicio_atendimento, fim_atendimento, pagamento, id_servico, id_cliente, id_colaborador, id_sala, id_unidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [inicio_atendimento, fim_atendimento, pagamento, id_servico, id_cliente, id_colaborador, id_sala, id_unidade], callback)
    },

    //Read
    getTodasInformacoes: (callback) => {
        db.query("SELECT a.inicio_atendimento, a.fim_atendimento, a.pagamento, s.tipo_servico AS servico, c.nome_cliente AS cliente, col.nome_colaborador AS colaborador, sa.tipo_sala AS sala, u.nome_unidade AS unidade FROM atendimentos a JOIN servicos s ON a.id_servico = s.id_servico JOIN clientes c ON a.id_cliente =c.id_cliente JOIN colaboradores col ON a.id_colaborador = col.id_colaborador JOIN salas sa ON a.id_sala = sa.id_sala JOIN unidades u ON a.id_unidade = u.id_unidade;",callback)
    },

    getInformacoesPorIdUnidade: (id_unidade, callback) => {
        db.query("SELECT a.inicio_atendimento, a.fim_atendimento, a.pagamento, s.tipo_servico AS servico, c.nome_cliente AS cliente, col.nome_colaborador AS colaborador, sa.tipo_sala AS sala, u.nome_unidade AS unidade FROM atendimentos a JOIN servicos s ON a.id_servico = s.id_servico JOIN clientes c ON a.id_cliente =c.id_cliente JOIN colaboradores col ON a.id_colaborador = col.id_colaborador JOIN salas sa ON a.id_sala = sa.id_sala JOIN unidades u ON a.id_unidade = u.id_unidade WHERE a.id_unidade = ?;", [id_unidade],callback)
    },

    getInformacoesPorIdColaborador: (id_colaborador, callback) => {
        db.query("SELECT a.inicio_atendimento, a.fim_atendimento, a.pagamento, s.tipo_servico AS servico, c.nome_cliente AS cliente, col.nome_colaborador AS colaborador, sa.tipo_sala AS sala, u.nome_unidade AS unidade FROM atendimentos a JOIN servicos s ON a.id_servico = s.id_servico JOIN clientes c ON a.id_cliente =c.id_cliente JOIN colaboradores col ON a.id_colaborador = col.id_colaborador JOIN salas sa ON a.id_sala = sa.id_sala JOIN unidades u ON a.id_unidade = u.id_unidade WHERE a.id_colaborador = ?;", [id_colaborador],callback)
    },

    //Update
    updateAtendimento: (inicio_atendimento, fim_atendimento, pagamento, id_servico, id_cliente, id_colaborador, id_sala, id_unidade, id_atendimento, callback) => {
        db.query("UPDATE atendimentos SET inicio_atendimento=?, fim_atendimento=?, pagamento=?, id_servico=?, id_cliente=?, id_colaborador=?, id_sala=?, id_unidade=? WHERE id_atendimento=?;", [inicio_atendimento, fim_atendimento, pagamento, id_servico, id_cliente, id_colaborador, id_sala, id_unidade, id_atendimento], callback)
    },

    //Delete
    deleteAtendimento: (id_atendimento, callback) => {
        db.query("DELETE FROM atendimentos WHERE id_atendimento = ?", [id_atendimento], callback)
    },

};

module.exports = Atendimentos;