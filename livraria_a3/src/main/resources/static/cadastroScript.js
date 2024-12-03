function limparCampos() {
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("number").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
    // Limpar o campo de gênero, se necessário
    const generoInputs = document.querySelectorAll('input[name="gender"]');
    generoInputs.forEach(input => input.checked = false);
    // Limpar o campo CPF
    document.getElementById("cpf").value = "";
}

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

// Função para validar as senhas
function validarSenhas() {
    const senha = document.getElementById("password").value;
    const senhaConfirmada = document.getElementById("confirmPassword").value;
    
    if (senha !== senhaConfirmada) {
        alert("As senhas não são iguais!");
        return false;
    }
    return true;
}

// Função para validar o CPF
function validarCPF() {
    let cpf = document.getElementById('cpf').value.replace(/\D/g, ''); // Remove os caracteres não numéricos

    if (cpf.length !== 11) {
        alert("CPF inválido! Certifique-se de que está digitando 11 dígitos.");
        return false;
    }

    // Verifica se o CPF não é uma sequência de números repetidos (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) {
        alert("CPF inválido! Não pode ser uma sequência de números repetidos.");
        return false;
    }

    // Verificar a soma dos números do CPF
    let soma = 0;
    for (let i = 0; i < 11; i++) {
        soma += parseInt(cpf.charAt(i));
    }

    // Verificar se a soma é 33, 44, 55 ou 66
    if (![33, 44, 55, 66].includes(soma)) {
        alert("CPF inválido! A soma dos números do CPF deve ser 33, 44, 55 ou 66.");
        return false;
    }

    return true;
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

    // Validação de Senha
    if (!validarSenhas()) {
        return; // Interrompe o envio se as senhas não forem iguais
    }

    // Validação de CPF
    if (!validarCPF()) {
        return; // Interrompe o envio se o CPF for inválido
    }

    const nome = document.getElementById("firstname").value;
    const sobrenome = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const celular = document.getElementById("number").value;
    const senha = document.getElementById("password").value;
    

    // Objeto do usuário
    const usuario = { nome, sobrenome, email, celular, senha };

    // Envio para API
    fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    })
        .then(response => {
            if (response.status === 200) {
                alert("Usuário cadastrado com sucesso!");
                limparCampos();
            } else {
                alert("Erro ao cadastrar o usuário.");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Ocorreu um erro na requisição.");
        });
});
