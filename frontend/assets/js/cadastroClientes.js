document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Pegando os valores do formulário
        const nome_cliente = document.getElementById("nome").value;
        const email_cliente = document.getElementById("email").value;
        const telefone_cliente = document.getElementById("telefone").value;
        const data_nasc = document.getElementById("data_nascimento").value;

        const payload = {
            nome_cliente,
            email_cliente,
            telefone_cliente,
            data_nasc
        };

        try {
            const resposta = await fetch("http://localhost:3000/api/clientes/novoCliente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await resposta.json();

            if (resposta.ok) {
                alert("Cliente cadastrado com sucesso! ID: " + data.id);
                form.reset();
            } else {
                alert("Erro: " + data.error);
            }

        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            alert("Erro ao cadastrar cliente!");
        }
    });

});