const avatar = document.getElementById('avatar');
const dropdown = document.getElementById('dropdown');

avatar.addEventListener('click', (event) => {
    event.stopPropagation();
    dropdown.classList.toggle('active');
});

document.addEventListener('click', () => {
    dropdown.classList.remove('active');
});

document.getElementById('editarPerfil').addEventListener('click', () => {
    window.location.href = '/frontend/telas_gerente/janela_edicao.html';
});

document.getElementById('logout').addEventListener('click', () => {
    alert('Você saiu da conta.');
    window.location.href = '/frontend/telas/login/login.html';
});

function getPageInfo() {
    const path = window.location.pathname;

    let unidadeId;
    if (path.includes("goldenSquare")) unidadeId = 2;
    if (path.includes("grandPlaza")) unidadeId = 1;
    if (path.includes("mooca")) unidadeId = 3;
    if (path.includes("westPlaza")) unidadeId = 4;

    let tipoSala;
    if (path.includes("maca")) tipoSala = "Maca";
    if (path.includes("quick")) tipoSala = "Quick Massage";
    if (path.includes("reflexo")) tipoSala = "Poltrona Reflexologia";

    return { unidadeId, tipoSala };
}

function getCards() {
    return [...document.querySelectorAll(".card")].map(card => {
        const texto = card.querySelector("h2").textContent;
        const numero = parseInt(texto.replace("SALA", "").trim());
        return { card, numero };
    });
}

/* 🔥 Prefixos reais de cada unidade */
function getPrefixoUnidade(unidadeId) {
    const map = {
        1: "GRAND",
        2: "GOLDEN",
        3: "MOOCA",
        4: "WEST"
    };
    return map[unidadeId];
}

/* 🔥 Gera o nome EXATAMENTE como está no banco */
function getNomeSala(tipoSala, numero, unidadeId) {
    const prefixo = getPrefixoUnidade(unidadeId);

    if (tipoSala === "Maca") return `${prefixo} - Maca ${numero}`;
    if (tipoSala === "Quick Massage") return `${prefixo} - Quick ${numero}`;
    if (tipoSala === "Poltrona Reflexologia") return `${prefixo} - Poltrona ${numero}`;

    return null;
}

async function atualizarSalas() {
    const { unidadeId, tipoSala } = getPageInfo();
    const cards = getCards();

    try {
        const resSalas = await fetch(`http://localhost:3000/salas/${unidadeId}`);
        const salas = await resSalas.json();

        const resAg = await fetch(`http://localhost:3000/salas/agendamentos/${unidadeId}`);
        const agendamentos = await resAg.json();

        cards.forEach(c => {
            const numeroSala = c.numero;

            const nomeBanco = getNomeSala(tipoSala, numeroSala, unidadeId);
            if (!nomeBanco) return;

            const salaDB = salas.find(s => s.tipo_sala === nomeBanco);
            if (!salaDB) return;

            const ocupada = agendamentos.some(a => a.id_sala === salaDB.id_sala);

            if (ocupada) {
                c.card.style.border = "5px solid red";
                c.card.style.filter = "grayscale(50%)";
            } else {
                c.card.style.border = "5px solid #4CAF50";
                c.card.style.filter = "none";
            }
        });

    } catch (erro) {
        console.error("Erro ao atualizar salas:", erro);
    }
}

atualizarSalas();
setInterval(atualizarSalas, 5000);