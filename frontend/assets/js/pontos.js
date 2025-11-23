
let usuarios = [
  { id: 1, nome: "Maria Silva", cargo: "Funcionário", foto: "", pontos: 0 },
  { id: 2, nome: "João Pedro", cargo: "Funcionário", foto: "", pontos: 0 },
  { id: 3, nome: "Ana Santos", cargo: "Funcionário", foto: "", pontos: 0 },
  { id: 4, nome: "Carlos Oliveira", cargo: "Gerente", foto: "", pontos: 0 },
];

const tbody = document.querySelector("tbody");
const addBtn = document.getElementById('addBtn');
const modal = document.getElementById('modal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');
const pointsInput = document.getElementById('pointsInput');
const searchInput = document.querySelector('.search');

let selectedUser = null;


function renderTabela(lista = usuarios) {
  tbody.innerHTML = "";

  lista.forEach(user => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="name">${user.nome}</td>
      <td class="points">${user.pontos}</td>
    `;

    tr.querySelector(".name").addEventListener("click", () => {
      document.querySelectorAll(".name").forEach(n => n.classList.remove("selected"));
      tr.querySelector(".name").classList.add("selected");
      selectedUser = user;
    });

    tbody.appendChild(tr);
  });
}

renderTabela();

addBtn.addEventListener('click', () => {
  if (!selectedUser) {
    alert('Selecione um trabalhador primeiro!');
    return;
  }
  modal.classList.remove('hidden');
});


cancelBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  pointsInput.value = '';
});


confirmBtn.addEventListener('click', () => {
  const valor = parseInt(pointsInput.value);

  if (isNaN(valor) || valor < 0) {
    alert('Digite um número válido!');
    return;
  }

  selectedUser.pontos += valor;

  renderTabela();
  modal.classList.add('hidden');
  pointsInput.value = '';
});



searchInput.addEventListener('input', () => {
  const termo = searchInput.value.toLowerCase();

  const filtrados = usuarios.filter(user =>
    user.nome.toLowerCase().includes(termo)
  );

  renderTabela(filtrados);
});
