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
}