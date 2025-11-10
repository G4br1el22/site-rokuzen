const btnToday = document.getElementById('btn-today');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
const dateTitle = document.getElementById('dateTitle');
const dayNumber = document.getElementById('dayNumber');
const agendaContent = document.getElementById('agendaContent');
const btnNew = document.getElementById('btn-new');
const modal = document.getElementById('modal');
const eventForm = document.getElementById('eventForm');
const btnCancel = document.getElementById('btn-cancel');
const viewBtns = document.querySelectorAll('.view-btn');

let viewMode = 'day';
let currentDate = new Date();

const API_URL = "http://localhost:3000/api/atendimentos";
const ID_UNIDADE = 1; // você pode trocar conforme o gerente logado

// --- 🟢 Sincronização entre abas ---
const canal = new BroadcastChannel("agenda_sync");

canal.onmessage = (e) => {
  const { tipo, dados } = e.data;

  if (tipo === "alterarData") {
    currentDate = new Date(dados);
    renderAgenda();
  } else if (tipo === "alterarView") {
    viewMode = dados;
    viewBtns.forEach(x => x.classList.remove('active'));
    const btn = document.querySelector(`[data-view="${viewMode}"]`);
    if (btn) btn.classList.add('active');
    renderAgenda();
  } else if (tipo === "novoEvento") {
    renderAgenda();
  }
};

function sincronizar(tipo, dados) {
  canal.postMessage({ tipo, dados });
}
// --- 🔵 Fim da sincronização ---

function formatDateTitle(d) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return d.toLocaleDateString('pt-BR', options);
}

function zero(n) { return n < 10 ? '0' + n : String(n); }

function calcularDuracao(inicio, fim) {
  const start = new Date(inicio);
  const end = new Date(fim);
  return (end - start) / (1000 * 60 * 60); // duração em horas
}

function calcularFim(date, start, duracaoHoras) {
  const [h, m] = start.split(":").map(Number);
  const inicio = new Date(date);
  inicio.setHours(h, m, 0);
  inicio.setHours(inicio.getHours() + duracaoHoras);
  return inicio.toISOString().slice(0, 19);
}

async function loadEvents() {
  try {
    const res = await fetch(`${API_URL}/${ID_UNIDADE}`);
    if (!res.ok) throw new Error("Erro ao buscar agendamentos do servidor");
    const data = await res.json();

    // Converte os registros do banco para o formato usado na interface
    return data.map((ev, i) => ({
      id: i + 1,
      title: `${ev.cliente} – ${ev.servico} (${ev.sala})`,
      date: ev.inicio_atendimento.slice(0, 10),
      start: ev.inicio_atendimento.slice(11, 16),
      duration: calcularDuracao(ev.inicio_atendimento, ev.fim_atendimento)
    }));
  } catch (err) {
    console.error("❌ Erro ao carregar eventos:", err);
    return [];
  }
}

async function saveEventToDB(evento) {
  try {
    const body = {
      inicio_atendimento: `${evento.date}T${evento.start}:00`,
      fim_atendimento: calcularFim(evento.date, evento.start, evento.duration),
      pagamento: "pendente",
      id_servico: 1,
      id_cliente: 1,
      id_colaborador: 1,
      id_sala: 1,
      id_unidade: ID_UNIDADE
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error("Erro ao salvar atendimento");
    console.log("✅ Atendimento salvo no banco com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao salvar no banco:", err);
  }
}

async function renderAgenda() {
  dateTitle.textContent = formatDateTitle(currentDate);
  dayNumber.textContent = String(currentDate.getDate());
  agendaContent.innerHTML = '';

  if (viewMode === 'month') return renderMonthView();
  if (viewMode === 'week') return renderWeekView();
  return renderDayView();
}

async function renderDayView() {
  for (let h = 0; h < 24; h++) {
    const row = document.createElement('div');
    row.className = 'hour-row';
    row.innerHTML = `<div class="hour-time">${zero(h)}:00</div><div style="flex:1"></div>`;
    agendaContent.appendChild(row);
  }

  const events = await loadEvents();
  const iso = currentDate.toISOString().slice(0, 10);
  const eventsToday = events.filter(ev => ev.date === iso);

  const rows = agendaContent.querySelectorAll('.hour-row');
  const rowHeight = rows[0] ? rows[0].getBoundingClientRect().height : 52;

  eventsToday.forEach(ev => {
    const [hh, mm] = ev.start.split(':').map(n => parseInt(n, 10));
    const top = (hh + mm / 60) * rowHeight + 8;
    const height = Math.max(36, (ev.duration || 1) * rowHeight - 8);
    const div = document.createElement('div');
    div.className = 'event';
    div.style.top = `${top}px`;
    div.style.height = `${height}px`;
    div.textContent = ev.title;
    agendaContent.appendChild(div);
  });
}

async function renderWeekView() {
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.gap = '8px';
  header.style.marginBottom = '8px';

  const start = new Date(currentDate);
  const day = start.getDay();
  const diff = (day === 0) ? -6 : (1 - day);
  start.setDate(start.getDate() + diff);

  const events = await loadEvents();

  for (let i = 0; i < 7; i++) {
    const col = document.createElement('div');
    col.style.flex = '1';
    col.style.minHeight = '220px';
    col.style.border = '1px solid #f0f2f3';
    col.style.borderRadius = '6px';
    col.style.padding = '8px';
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const title = document.createElement('div');
    title.style.fontWeight = '700';
    title.style.marginBottom = '6px';
    title.textContent = d.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' });
    col.appendChild(title);

    const dStr = d.toISOString().slice(0, 10);
    const evs = events.filter(e => e.date === dStr);
    evs.forEach(e => {
      const li = document.createElement('div');
      li.style.background = '#f2f7dd';
      li.style.padding = '6px';
      li.style.marginBottom = '6px';
      li.style.borderRadius = '6px';
      li.style.fontSize = '13px';
      li.textContent = `${e.start} • ${e.title}`;
      col.appendChild(li);
    });

    header.appendChild(col);
  }

  agendaContent.appendChild(header);
}

async function renderMonthView() {
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(7,1fr)';
  grid.style.gap = '6px';
  grid.style.minHeight = '260px';

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = first.getDay() === 0 ? 6 : first.getDay() - 1;
  const total = last.getDate();

  const events = await loadEvents();

  for (let i = 0; i < 42; i++) {
    const cell = document.createElement('div');
    cell.style.minHeight = '60px';
    cell.style.border = '1px solid #f0f3f2';
    cell.style.padding = '6px';
    cell.style.borderRadius = '6px';
    const dayNum = i - startDay + 1;
    if (dayNum > 0 && dayNum <= total) {
      const title = document.createElement('div');
      title.textContent = dayNum;
      title.style.fontWeight = '700';
      title.style.marginBottom = '6px';
      cell.appendChild(title);

      const dstr = new Date(year, month, dayNum).toISOString().slice(0, 10);
      const evs = events.filter(e => e.date === dstr);
      evs.slice(0, 3).forEach(e => {
        const li = document.createElement('div');
        li.style.background = '#f2f7dd';
        li.style.padding = '4px';
        li.style.marginBottom = '6px';
        li.style.borderRadius = '4px';
        li.style.fontSize = '12px';
        li.textContent = `${e.start} ${e.title}`;
        cell.appendChild(li);
      });
    } else {
      cell.style.opacity = '0.25';
    }
    grid.appendChild(cell);
  }
  agendaContent.appendChild(grid);
}

// --- Navegação e eventos de UI ---
btnToday.addEventListener('click', () => {
  currentDate = new Date();
  renderAgenda();
  sincronizar("alterarData", currentDate.toISOString());
});

btnPrev.addEventListener('click', () => {
  if (viewMode === 'day') currentDate.setDate(currentDate.getDate() - 1);
  else if (viewMode === 'week') currentDate.setDate(currentDate.getDate() - 7);
  else currentDate.setMonth(currentDate.getMonth() - 1);
  renderAgenda();
  sincronizar("alterarData", currentDate.toISOString());
});

btnNext.addEventListener('click', () => {
  if (viewMode === 'day') currentDate.setDate(currentDate.getDate() + 1);
  else if (viewMode === 'week') currentDate.setDate(currentDate.getDate() + 7);
  else currentDate.setMonth(currentDate.getMonth() + 1);
  renderAgenda();
  sincronizar("alterarData", currentDate.toISOString());
});

viewBtns.forEach(b => {
  b.addEventListener('click', () => {
    viewBtns.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    viewMode = b.dataset.view;
    renderAgenda();
    sincronizar("alterarView", viewMode);
  });
});

btnNew.addEventListener('click', () => {
  const dt = new Date(currentDate);
  const dateInput = eventForm.querySelector('[name="date"]');
  dateInput.value = dt.toISOString().slice(0, 10);
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
});

btnCancel.addEventListener('click', () => {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  }
});

eventForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(eventForm);
  const ev = {
    id: Date.now(),
    title: form.get('title').trim(),
    date: form.get('date'),
    start: form.get('start'),
    duration: parseFloat(form.get('duration')) || 1
  };

  await saveEventToDB(ev);
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  eventForm.reset();
  renderAgenda();
  sincronizar("novoEvento");
});

window.addEventListener('load', () => {
  renderAgenda();
});
