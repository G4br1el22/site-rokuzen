const scheduleTable = document.querySelector('.schedule tbody');

function horaParaNumero(horaStr) {
  const [h, m] = horaStr.split(':').map(Number);
  return h + (m / 60);
}


function mostrarEscala(terapeuta) {
  console.log('Mostrando escala de:', terapeuta.nome_colaborador);

  scheduleTable.innerHTML = '';

  let inicio = horaParaNumero(terapeuta.inicio_escala);
  let fim = horaParaNumero(terapeuta.fim_escala);

  for (let h = 0; h < 24; h++) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');

    if (h >= inicio && h < fim) {
      td.textContent = `${h.toString().padStart(2, '0')}:00 — Está na loja`;
      td.style.backgroundColor = '#c6d9a2';
    } else {
      td.textContent = `${h.toString().padStart(2, '0')}:00`;
    }

    tr.appendChild(td);
    scheduleTable.appendChild(tr);
  }
}

async function carregarEscalas() {
  console.log('carregarEscalas rodou');

  try {
    const resposta = await fetch('http://localhost:3000/escala-massagistas');
    const unidades = await resposta.json();

    console.log('Dados recebidos:', unidades);

    const aside = document.querySelector('.sidebar');
    aside.innerHTML = '<h2>TERAPEUTAS</h2>';

    unidades.forEach(unidade => {
      const tituloUnidade = document.createElement('h3');

      switch (unidade.id_unidade) {
        case 1:
          tituloUnidade.textContent = 'Grand Plaza';
          break;
        case 2:
          tituloUnidade.textContent = 'Golden Square';
          break;
        case 3:
          tituloUnidade.textContent = 'Mooca Plaza';
          break;
        case 4:
          tituloUnidade.textContent = 'West Plaza';
          break;
        default:
          tituloUnidade.textContent = `Unidade ${unidade.id_unidade}`;
      }

      aside.appendChild(tituloUnidade);

      unidade.escala.forEach(e => {
        const botao = document.createElement('button');
        botao.className = 'therapist';
        botao.textContent = e.nome_colaborador;

        botao.addEventListener('click', () => {
          aside.querySelectorAll('.therapist').forEach(b => b.classList.remove('active'));
          botao.classList.add('active');
          mostrarEscala(e);
        });

        aside.appendChild(botao);
      });
    });
  } catch (err) {
    console.error('Erro ao carregar escalas:', err);
  }
}


carregarEscalas();