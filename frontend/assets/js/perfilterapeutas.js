// banco de dados falso.
const fakeDatabase = {
  "1": { 
    name: "Ana Banana", 
    email: "ana@exemplo.com",
    photo: "/site-rokuzen/frontend/images/logo+ava/avatar_default.jpg" 
  },
  "2": { 
    name: "João Silva", 
    email: "joao@exemplo.com",
    photo: "/site-rokuzen/frontend/images/logo+ava/avatar_default.jpg" 
  },
  "3": { 
    name: "Luiza Souza", 
    email: "luiza@exemplo.com",
    photo: "/site-rokuzen/frontend/images/logo+ava/avatar_default.jpg" 
  },
  "4": { 
    name: "Marcos Pereira", 
    email: "marcos@exemplo.com",
    photo: "/site-rokuzen/frontend/images/logo+ava/avatar_default.jpg" 
  }
};

document.addEventListener('DOMContentLoaded', () => {

  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const profilePic = document.getElementById('profilePic');
  const headerIcon = document.querySelector('.profile-icon'); 

  const params = new URLSearchParams(window.location.search);
  const userId = params.get('id');

  const userData = fakeDatabase[userId];

  if (userData) {
    nameInput.value = userData.name;
    emailInput.value = userData.email;
    profilePic.src = userData.photo;
    headerIcon.src = userData.photo;
  } else {
    nameInput.value = "Usuário não encontrado";
    emailInput.value = "Email não encontrado";
  }

  const editBtn = document.getElementById('editBtn');
  const inputs = document.querySelectorAll('#nameInput, #emailInput');
  const photoInput = document.getElementById('photoUpload');

  let editMode = false;

  editBtn.addEventListener('click', () => {
    editMode = !editMode;

    if (editMode) {
      editBtn.textContent = "Salvar Alterações";
      inputs.forEach(i => i.disabled = false);
      photoInput.disabled = false;
    } else {
      editBtn.textContent = "Editar Perfil";
      inputs.forEach(i => i.disabled = true);
      photoInput.disabled = true;

      alert("Alterações salvas (simulação)");
    }
  });

  photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhotoURL = event.target.result;
        profilePic.src = newPhotoURL;
        headerIcon.src = newPhotoURL;
      };
      reader.readAsDataURL(file);
    }
  });

});
