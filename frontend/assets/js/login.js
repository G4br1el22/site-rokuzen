const senhaInput = document.getElementById('senha');
const toggleSenha = document.getElementById('toggleSenha');

if (toggleSenha && senhaInput) {
    toggleSenha.addEventListener('click', () => {
        const tipoAtual = senhaInput.getAttribute('type');

        if (tipoAtual === 'password') {
            senhaInput.setAttribute('type', 'text');
            toggleSenha.classList.remove('fa-eye');
            toggleSenha.classList.add('fa-eye-slash');
        } else {
            senhaInput.setAttribute('type', 'password');
            toggleSenha.classList.remove('fa-eye-slash');
            toggleSenha.classList.add('fa-eye');
        }
    });
};

function validarAcesso(){
    const email = document.getElementById('email').value.trim().toLowerCase();
    const senha = document.getElementById('senha').value.trim().toLowerCase();

    if (email === "" || senha === "") {
      alert("Por favor, preencha os dois campos antes de continuar!");
     return;
    };

    switch (true) {
        case (email === 'adm@rokuzen.com' && senha === 'adm'):
            window.location.href = "/frontend/telas_gerente/agendamento_gerente.html";
            console.log("Acessado como ADM")
            break;
        case (email === 'maria.silva@rokuzen.com' && senha === 'massagista'):
            window.location.href = "/frontend/telas_terapeutas/escala/escala_individual.html";
            console.log("Acessado como massagista")
            break;
    
        case ((email === 'recepcao_1@rokuzen.com' ||
            email === 'recepcao_2@rokuzen.com' ||
            email === 'recepcao_3@rokuzen.com' ||
            email === 'recepcao_4@rokuzen.com'
        ) && senha === 'recepcao'):
            window.location.href = "/frontend/telas/escolha_a_unidade/escolha_sua_unidade.html";
            console.log("Acessado como recepcionista")
            break;

        default:
            alert(`Ops, não achamos os dados de ${email} no nosso banco de dados. Verifique se escreveu corretamente`)
            break;
    }
}