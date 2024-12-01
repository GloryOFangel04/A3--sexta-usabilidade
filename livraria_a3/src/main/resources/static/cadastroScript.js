// Função para formatar CPF
function formatCPF(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico

    if (value.length <= 3) {
        value = value.replace(/(\d{3})(\d{0,})/, '$1.$2');
    } else if (value.length <= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{0,})/, '$1.$2.$3');
    } else if (value.length <= 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,})/, '$1.$2.$3-$4');
    } else {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    input.value = value;
}

// Função para validar CPF
function validarCPF() {
    let cpf = document.getElementById('cpf').value.replace(/\D/g, ''); // Remove os caracteres não numéricos
    let soma = 0;

    if (cpf.length !== 11) {
        alert("CPF inválido! Certifique-se de que está digitando 11 dígitos.");
        return false;
    }

    for (let i = 0; i < cpf.length; i++) {
        soma += parseInt(cpf.charAt(i), 10);
    }

    if ([33, 44, 55, 66].includes(soma)) {
        return true;
    } else {
        alert("CPF inválido! A soma dos dígitos não é 33, 44, 55 ou 66.");
        return false;
    }
}

// Função para alternar visibilidade da senha
const toggleSenha = document.getElementById("toggleSenha");
const inputSenha = document.getElementById("password");

toggleSenha.addEventListener("click", () => {
    if (inputSenha.type === "password") {
        inputSenha.type = "text"; // Mostrar senha
        toggleSenha.classList.remove("bxs-lock-alt");
        toggleSenha.classList.add("bxs-lock-open-alt"); // Alterar ícone
    } else {
        inputSenha.type = "password"; // Ocultar senha
        toggleSenha.classList.remove("bxs-lock-open-alt");
        toggleSenha.classList.add("bxs-lock-alt"); // Alterar ícone
    }
});

// Função para formatar número de telefone
function formatPhoneNumber(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico

    if (value.length <= 2) {
        input.value = `(${value}`;
    } else if (value.length <= 7) {
        input.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
        input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    }
}

// Adicionar eventos de formatação
document.getElementById("cpf").addEventListener("input", formatCPF);
document.getElementById("number").addEventListener("input", formatPhoneNumber);

// Função para processar envio do formulário
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede envio padrão

    const nome = document.getElementById("firstname").value;
    const sobrenome = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const celular = document.getElementById("number").value;
    const senha = document.getElementById("password").value;
    const genero = document.querySelector('input[name="gender"]:checked')?.value;

    // Objeto do usuário
    const usuario = { nome, sobrenome, email, celular, senha, genero };

    // Envio para API
    fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    })
        .then(response => {
            if (response.status === 200) {
                alert("Usuário cadastrado com sucesso!");
            } else {
                alert("Erro ao cadastrar o usuário.");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Ocorreu um erro na requisição.");
        });
});
