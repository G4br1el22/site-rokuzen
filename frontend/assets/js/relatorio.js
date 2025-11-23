function abrirRelatorio(horario) {
  window.location.href = `relatorio.html?horario=${encodeURIComponent(horario)}`;
}

function salvarRelatorio() {
  const params = new URLSearchParams(window.location.search);
  const horario = params.get("horario");

  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const texto = document.getElementById("texto").value;
  const servico = document.getElementById("servico").value;
  const unidade = document.getElementById("unidade").value;

  const relatorio = { data, hora, texto, servico, unidade };
  localStorage.setItem(`relatorio_${horario}`, JSON.stringify(relatorio));

  alert("Relatório salvo com sucesso!");
  window.location.href = "relatorios.html";
}

window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const horario = params.get("horario");

  if (horario && document.getElementById("texto")) {
    const salvo = localStorage.getItem(`relatorio_${horario}`);
    if (salvo) {
      const dados = JSON.parse(salvo);
      document.getElementById("data").value = dados.data || "";
      document.getElementById("hora").value = dados.hora || horario;
      document.getElementById("texto").value = dados.texto || "";
      document.getElementById("servico").value = dados.servico || "Quick Massage";
      document.getElementById("unidade").value = dados.unidade || "Grand Plaza / Santo André";
    } else {
      document.getElementById("hora").value = horario;
    }
    document.getElementById("hora").setAttribute("step", "60");
  }

  if (document.querySelector(".cards-grid")) {
    carregarRelatorios();
  }

  const btnAdicionar = document.getElementById("btnAdicionar");
  const modal = document.getElementById("modalNovoRelatorio");
  const btnCancelar = document.getElementById("cancelarNovo");
  const btnSalvar = document.getElementById("salvarNovo");

  if (btnAdicionar) {
    btnAdicionar.onclick = () => modal.style.display = "flex";
  }

  if (btnCancelar) {
    btnCancelar.onclick = () => modal.style.display = "none";
  }

  if (btnSalvar) {
    btnSalvar.onclick = () => {
      const servico = document.getElementById("novoServico").value.trim();
      const unidade = document.getElementById("novaUnidade").value.trim();
      const data = document.getElementById("novaData").value;
      const hora = document.getElementById("novoHorario").value;

      if (!servico || !unidade || !data || !hora) {
        alert("Preencha todos os campos!");
        return;
      }

      const relatorio = { servico, unidade, data, hora, texto: "" };
      localStorage.setItem(`relatorio_${hora}`, JSON.stringify(relatorio));

      modal.style.display = "none";
      document.getElementById("novoServico").value = "";
      document.getElementById("novaUnidade").value = "";
      document.getElementById("novaData").value = "";
      document.getElementById("novoHorario").value = "";

      carregarRelatorios();
    };
  }
};

function carregarRelatorios() {
  const grid = document.getElementById("cardsGrid");
  grid.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("relatorio_")) {
      const dados = JSON.parse(localStorage.getItem(key));
      const card = document.createElement("div");
      card.className = "card";
      card.onclick = () => abrirRelatorio(dados.hora);
      card.innerHTML = `
        ${dados.servico || "Quick Massage"} – ${dados.unidade || "Grand Plaza / Santo André"}<br>
        Dia: ${dados.data || "–"} Horário: ${dados.hora}
      `;
      grid.appendChild(card);
    }
  }
}
