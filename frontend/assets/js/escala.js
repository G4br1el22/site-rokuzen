// Script simples para mudar o terapeuta ativo
const therapists = document.querySelectorAll(".therapist");

therapists.forEach(btn => {
  btn.addEventListener("click", () => {
    therapists.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

const scheduleTable = document.querySelector('.schedule tbody');

// Função para mostrar a escala do terapeuta na tabela
function mostrarEscala(terapeuta) {
  // Limpa tabela antes de adicionar
  scheduleTable.innerHTML = '';

  // Pega hora de início e fim (somente a hora)
  let inicio = parseInt(terapeuta.inicio_escala.split(':')[0]);
  let fim = parseInt(terapeuta.fim_escala.split(':')[0]);

  // Preenche cada hora do dia
  for (let h = 0; h < 24; h++) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');

    if (h >= inicio && h < fim) {
      td.textContent = `${h.toString().padStart(2, '0')}:00 — Disponível`;
      td.style.backgroundColor = '#c6d9a2'; // destaque visual
    } else {
      td.textContent = `${h.toString().padStart(2, '0')}:00`;
    }

    tr.appendChild(td);
    scheduleTable.appendChild(tr);
  }
}

// Função para carregar terapeutas e escalas
async function carregarEscalas() {
  try {
    const resposta = await fetch('http://localhost:3000/escala-massagistas');
    const unidades = await resposta.json();

    const aside = document.querySelector('.sidebar');
    aside.innerHTML = '<h2>TERAPEUTAS</h2>'; // limpa e recria o título

    unidades.forEach(unidade => {
      const tituloUnidade = document.createElement('h3');
      tituloUnidade.textContent = `Unidade ${unidade.id_unidade}`;
      aside.appendChild(tituloUnidade);
    
      unidade.escala.forEach(e => {
        const botao = document.createElement('button');
        botao.className = 'therapist';
        botao.textContent = e.nome_colaborador;
    
        botao.addEventListener('click', () => {
          // Remove a classe "active" de todos os botões
          aside.querySelectorAll('.therapist').forEach(b => b.classList.remove('active'));
          botao.classList.add('active');

          // Mostra a escala do terapeuta na tabela
          mostrarEscala(e);
        });
    
        aside.appendChild(botao);
      });
    });
    
  } catch (err) {
    console.error('Erro ao carregar escalas:', err);
  }
}

// Chama a função para carregar os dados
carregarEscalas();