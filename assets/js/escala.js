// Script simples para mudar o terapeuta ativo
const therapists = document.querySelectorAll(".therapist");

therapists.forEach(btn => {
  btn.addEventListener("click", () => {
    therapists.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
