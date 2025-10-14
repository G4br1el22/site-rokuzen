/* script.js
 - controla navegação de dias, views (dia/semana/mês), modal e armazenamento de eventos
 - eventos são salvos em localStorage sob a chave "rz_events"
*/

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

let viewMode = 'day'; // day | week | month
let currentDate = new Date(); // data mostrada

// carrega/guarda eventos no localStorage
function loadEvents(){
  const raw = localStorage.getItem('rz_events');
  return raw ? JSON.parse(raw) : [];
}
function saveEvents(arr){
  localStorage.setItem('rz_events', JSON.stringify(arr));
}

// formatadores simples
function formatDateTitle(d){
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return d.toLocaleDateString('pt-BR', options);
}
function zero(n){ return n<10 ? '0'+n : String(n); }

// renderiza a agenda (apenas visual day/grid de horas)
function renderAgenda(){
  // atualiza texto da data
  dateTitle.textContent = formatDateTitle(currentDate);
  dayNumber.textContent = String(currentDate.getDate());

  // limpar
  agendaContent.innerHTML = '';

  if(viewMode === 'month'){
    renderMonthView();
    return;
  }
  if(viewMode === 'week'){
    renderWeekView();
    return;
  }
  renderDayView();
}

function renderDayView(){
  // constrói 24 linhas de hora (00:00 -> 23:00)
  for(let h=0; h<24; h++){
    const row = document.createElement('div');
    row.className = 'hour-row';
    row.innerHTML = `<div class="hour-time">${zero(h)}:00</div><div style="flex:1"></div>`;
    agendaContent.appendChild(row);
  }

  // posicionar eventos do dia
  const events = loadEvents();
  const iso = currentDate.toISOString().slice(0,10);
  const eventsToday = events.filter(ev => ev.date === iso);

  // cálculo de posição: cada hora linha tem certa altura; usamos altura média de row
  const rows = agendaContent.querySelectorAll('.hour-row');
  const rowHeight = rows[0] ? rows[0].getBoundingClientRect().height : 52;
  eventsToday.forEach(ev => {
    const [hh, mm] = ev.start.split(':').map(n=>parseInt(n,10));
    const top = (hh + mm/60) * rowHeight + 8; // offset de padding
    const height = Math.max(36, (ev.duration || 1) * rowHeight - 8);
    const div = document.createElement('div');
    div.className = 'event';
    div.style.top = `${top}px`;
    div.style.height = `${height}px`;
    div.textContent = ev.title;
    agendaContent.appendChild(div);
  });
}

function renderWeekView(){
  // simples grid: 7 colunas com nome do dia e pequenas entradas (resumo)
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.gap = '8px';
  header.style.marginBottom = '8px';

  const start = new Date(currentDate);
  // ajustar para o início da semana (segunda = 1); aqui consideramos segunda como início
  const day = start.getDay();
  const diff = (day === 0) ? -6 : (1 - day);
  start.setDate(start.getDate() + diff);

  for(let i=0;i<7;i++){
    const col = document.createElement('div');
    col.style.flex='1';
    col.style.minHeight='220px';
    col.style.border='1px solid #f0f2f3';
    col.style.borderRadius='6px';
    col.style.padding='8px';
    const d = new Date(start);
    d.setDate(start.getDate()+i);
    const title = document.createElement('div');
    title.style.fontWeight='700';
    title.style.marginBottom='6px';
    title.textContent = d.toLocaleDateString('pt-BR',{weekday:'short', day:'numeric'});
    col.appendChild(title);

    // colocar lista de eventos do dia
    const evs = loadEvents().filter(e => e.date === d.toISOString().slice(0,10));
    evs.forEach(e => {
      const li = document.createElement('div');
      li.style.background='#f2f7dd';
      li.style.padding='6px';
      li.style.marginBottom='6px';
      li.style.borderRadius='6px';
      li.style.fontSize='13px';
      li.textContent = `${e.start} • ${e.title}`;
      col.appendChild(li);
    });

    header.appendChild(col);
  }

  agendaContent.appendChild(header);
}

function renderMonthView(){
  // grid 7x5 com dias
  const grid = document.createElement('div');
  grid.style.display='grid';
  grid.style.gridTemplateColumns='repeat(7,1fr)';
  grid.style.gap='6px';
  grid.style.minHeight='260px';

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month+1, 0);
  const startDay = first.getDay() === 0 ? 6 : first.getDay()-1; // shift segunda=0
  const total = last.getDate();

  // preencher 42 células
  for(let i=0;i<42;i++){
    const cell = document.createElement('div');
    cell.style.minHeight='60px';
    cell.style.border='1px solid #f0f3f2';
    cell.style.padding='6px';
    cell.style.borderRadius='6px';
    const dayNum = i - startDay + 1;
    if(dayNum>0 && dayNum<=total){
      const title = document.createElement('div');
      title.textContent = dayNum;
      title.style.fontWeight='700';
      title.style.marginBottom='6px';
      cell.appendChild(title);

      // eventos do dia
      const dstr = new Date(year, month, dayNum).toISOString().slice(0,10);
      const evs = loadEvents().filter(e => e.date === dstr);
      evs.slice(0,3).forEach(e=>{
        const li = document.createElement('div');
        li.style.background='#f2f7dd';
        li.style.padding='4px';
        li.style.marginBottom='6px';
        li.style.borderRadius='4px';
        li.style.fontSize='12px';
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

// navegação e handlers
btnToday.addEventListener('click', ()=>{
  currentDate = new Date();
  renderAgenda();
});

btnPrev.addEventListener('click', ()=>{
  if(viewMode === 'day') currentDate.setDate(currentDate.getDate() - 1);
  else if(viewMode === 'week') currentDate.setDate(currentDate.getDate() - 7);
  else currentDate.setMonth(currentDate.getMonth() - 1);
  renderAgenda();
});

btnNext.addEventListener('click', ()=>{
  if(viewMode === 'day') currentDate.setDate(currentDate.getDate() + 1);
  else if(viewMode === 'week') currentDate.setDate(currentDate.getDate() + 7);
  else currentDate.setMonth(currentDate.getMonth() + 1);
  renderAgenda();
});

viewBtns.forEach(b=>{
  b.addEventListener('click', (ev)=>{
    viewBtns.forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); // só altera classe; visual não muda muito
    viewMode = b.dataset.view;
    renderAgenda();
  });
});

// Modal controle
btnNew.addEventListener('click', ()=> {
  // pré-preenche com data atual
  const dt = new Date(currentDate);
  const dateInput = eventForm.querySelector('[name="date"]');
  dateInput.value = dt.toISOString().slice(0,10);
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden','false');
});
btnCancel.addEventListener('click', ()=> {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden','true');
});

modal.addEventListener('click', (e)=>{
  if(e.target === modal){
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden','true');
  }
});

// salvar evento
eventForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const form = new FormData(eventForm);
  const ev = {
    id: Date.now(),
    title: form.get('title').trim(),
    date: form.get('date'),
    start: form.get('start'),
    duration: parseFloat(form.get('duration')) || 1
  };
  const events = loadEvents();
  events.push(ev);
  saveEvents(events);
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden','true');
  eventForm.reset();
  renderAgenda();
});


// inicializa
renderAgenda();