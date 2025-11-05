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
