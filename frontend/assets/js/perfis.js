// Pesquisa — filtra nomes (case-insensitive)
const searchInput = document.getElementById('search');
const users = document.querySelectorAll('.user');

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  users.forEach(user => {
    const name = user.textContent.toLowerCase();
    user.style.display = name.includes(term) ? 'block' : 'none';
  });
});


users.forEach(user => {
  user.addEventListener('dblclick', () => {
    
    const id = user.dataset.id; 

    if (id) {
      
      window.location.href = `perfilterapeutas.html?id=${id}`;
    }
  });
});
