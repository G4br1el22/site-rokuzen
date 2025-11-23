// banco de dados falso. 
// Os IDs (1, 2, 3) correspondem aos 'data-id' do perfis.html
const fakeDatabase = {
  "1": { 
    name: "Ana Banana", 
    role: "Massoterapeuta", 
    photo: "/site-rokuzen/frontend/images/logo+ava/avatar_default.jpg" 
  },
  "2": { 
    name: "João Silva", 
    role: "Acupunturista", 
    photo: "/site-rokuzen/frontend/images/logo+ava/avatar_default.jpg" 
  },
  "3": { 
    name: "Luiza Souza", 
    role: "Recepcionista", 
    photo: "/site-rokuzen/frontend/images/logo+ava/avatar_default.jpg" 
  },
  "4": { 
    name: "Marcos Pereira", 
    role: "Massoterapeuta", 
    photo: "/site-rokuzen/frontend/images/logo+ava/avatar_default.jpg" 
  }
};

document.addEventListener('DOMContentLoaded', () => {

  const nameInput = document.getElementById('nameInput');
  const roleInput = document.getElementById('roleInput');
  const profilePic = document.getElementById('profilePic');
  const headerIcon = document.querySelector('.profile-icon'); 


  const params = new URLSearchParams(window.location.search);
  const userId = params.get('id');

  
  const userData = fakeDatabase[userId];

  
  if (userData) {
    nameInput.value = userData.name;
    roleInput.value = userData.role;
    profilePic.src = userData.photo;
    headerIcon.src = userData.photo;
  } else {
    nameInput.value = "Usuário não encontrado";
    roleInput.value = "Cargo desconhecido";
  }

  const editBtn = document.getElementById('editBtn');
  const inputs = document.querySelectorAll('input[type="text"]');
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
