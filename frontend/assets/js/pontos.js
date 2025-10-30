const names = document.querySelectorAll('.name');
const addBtn = document.getElementById('addBtn');
const modal = document.getElementById('modal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');
const pointsInput = document.getElementById('pointsInput');
const searchInput = document.querySelector('.search');

let selectedRow = null;

// Selecionar trabalhador
names.forEach(name => {
  name.addEventListener('click', () => {
    names.forEach(n => n.classList.remove('selected'));
    name.classList.add('selected');
    selectedRow = name.parentElement;
  });
});

addBtn.addEventListener('click', () => {
  if (!selectedRow) {
    alert('Selecione um trabalhador primeiro!');
    return;
  }
  modal.classList.remove('hidden');
});

// Cancelar
cancelBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  pointsInput.value = '';
});

// Confirmar adição de pontos
confirmBtn.addEventListener('click', () => {
  const value = parseInt(pointsInput.value);
  if (isNaN(value) || value < 0) {
    alert('Digite um número válido!');
    return;
  }
  const pointsCell = selectedRow.querySelector('.points');
  const currentPoints = parseInt(pointsCell.textContent || 0);
  pointsCell.textContent = currentPoints + value;
  modal.classList.add('hidden');
  pointsInput.value = '';
});

//  Pesquisa funcional (case-insensitive)
searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();

  document.querySelectorAll('tbody tr').forEach(row => {
    const nameCell = row.querySelector('.name');
    const nameText = nameCell.textContent.toLowerCase();
    if (nameText.includes(filter)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});
