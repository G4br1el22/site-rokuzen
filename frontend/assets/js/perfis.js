let usuarios = [
  { id: 1, nome: "Lucas Andrade", cargo: "Funcionário", foto: "" },
  { id: 2, nome: "Marina Silva", cargo: "Gerente", foto: "" },
  { id: 3, nome: "João Pedro", cargo: "Admin", foto: "" },
  { id: 4, nome: "Ana Santos", cargo: "Funcionário", foto: "" },
  { id: 5, nome: "Carlos Oliveira", cargo: "Gerente", foto: "" },
  { id: 6, nome: "Beatriz Costa", cargo: "Funcionário", foto: "" }
];

let usuarioSelecionado = null;
const defaultAvatarSrc = ""; 

const lista = document.getElementById("usuariosLista");
const nomeInput = document.getElementById("nomeInput");
const cargoInput = document.getElementById("cargoInput");
const preview = document.getElementById("previewFoto");
const searchInput = document.getElementById("searchInput");


const uploadFotoInput = document.getElementById("uploadFotoInput");
const removerFotoBtn = document.getElementById("removerFotoBtn");



function renderLista(usuariosFiltrados = usuarios) {
  lista.innerHTML = "";
  usuariosFiltrados.forEach(u => {
    const li = document.createElement("li");
    li.textContent = `${u.nome} — ${u.cargo}`;
    li.setAttribute("data-id", u.id);
    li.onclick = () => selecionarUsuario(u.id);

    if (usuarioSelecionado && usuarioSelecionado.id === u.id) {
      li.classList.add("selected");
    }

    lista.appendChild(li);
  });
}

function filterUsuarios() {
  const termo = searchInput.value.toLowerCase();
  const filtrados = usuarios.filter(u =>
    u.nome.toLowerCase().includes(termo) ||
    u.cargo.toLowerCase().includes(termo)
  );
  renderLista(filtrados);
}

searchInput.addEventListener("keyup", filterUsuarios);

function selecionarUsuario(id) {
  usuarioSelecionado = usuarios.find(u => u.id === id);

  Array.from(lista.children).forEach(li => li.classList.remove("selected"));
  const liSelecionado = lista.querySelector(`li[data-id="${id}"]`);
  if (liSelecionado) {
    liSelecionado.classList.add("selected");
  }

  nomeInput.value = usuarioSelecionado.nome;
  cargoInput.value = usuarioSelecionado.cargo;
  preview.src = usuarioSelecionado.foto || defaultAvatarSrc;


  uploadFotoInput.value = "";
}



uploadFotoInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

removerFotoBtn.addEventListener("click", () => {
  if (!usuarioSelecionado) return;

  preview.src = defaultAvatarSrc;
  uploadFotoInput.value = "";

  alert(`A foto de ${usuarioSelecionado.nome} será removida ao salvar.`);
});



const avatar = document.getElementById("avatar");
const dropdown = document.getElementById("dropdown");

avatar.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!avatar.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});



const form = document.getElementById("editarForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  if (!usuarioSelecionado) return;

  usuarioSelecionado.nome = nomeInput.value;
  usuarioSelecionado.cargo = cargoInput.value;
  usuarioSelecionado.foto = preview.src;

  filterUsuarios();
  selecionarUsuario(usuarioSelecionado.id);

  alert(`Alterações para ${usuarioSelecionado.nome} salvas!`);
});


renderLista();
