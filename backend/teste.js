//Testando desse jeito para fazer o controller

const Atendimentos = require('../backend/models/atendimentos'); // ajuste o caminho se precisar

async function pegarInformacoes() {
  try {
    const id_unidade_teste = 2; // Coloque um id válido que exista no seu banco
    const resultados = await Atendimentos.getInformacoesPorIdUnidade(id_unidade_teste);
    console.log('Resultados:', resultados);
  } catch (err) {
    console.error('Erro:', err.message);
  }
};

pegarInformacoes();