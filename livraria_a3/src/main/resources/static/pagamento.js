// Recuperando o totalQuantity armazenado no localStorage
const totalQuantity = localStorage.getItem('totalQuantity') || 0;
document.getElementById('qtd').value = totalQuantity; // Define o valor no campo de entrada

// Recuperando o totalPagamento armazenado no localStorage
const totalPagamento = parseFloat(localStorage.getItem("totalPagamento"));

// Atualizando o valor total na interface
if (!isNaN(totalPagamento)) {
    document.getElementById("payment-total").textContent = `R$${totalPagamento.toFixed(2).replace(".", ",")}`;
} else {
    document.getElementById("payment-total").textContent = "R$00,00";
}

// Evento para calcular o parcelamento
document.getElementById("parcelamento").addEventListener("change", () => {
    const total = parseFloat(localStorage.getItem("totalPagamento"));
    const parcelas = parseInt(document.getElementById("parcelamento").value);

    if (!isNaN(total)) {
        if (total <= 100) {
            if (parcelas > 2) {
                alert("O parcelamento é limitado a 2x para valores abaixo de R$100.");
                document.getElementById("parcelamento").value = 2;
                return;
            }
        } else {
            if (parcelas > 10) {
                alert("O parcelamento é limitado a 10x para valores acima de R$100.");
                document.getElementById("parcelamento").value = 10;
                return;
            }
        }

        let valorComJuros = total;
        if (parcelas > 5) {
            // Aplica os juros de 4% para parcelamentos acima de 5x
            valorComJuros = total * (1 + 0.04);
        }

        const valorParcela = (valorComJuros / parcelas).toFixed(2);
        document.getElementById("payment-total").textContent = `R$${valorParcela.replace(".", ",")}`;
    }
});

// Função para pegar o valor do cookie 'usuarioID'
function getCookieById() {
    const cookies = document.cookie.split('; ');

    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');

        if (name === 'usuarioID') {
            // Decodifica o valor do cookie para evitar problemas com caracteres especiais
            return decodeURIComponent(value);
        }
    }

    return null;
}

const usuarioID = getCookieById();

if (usuarioID) {
    console.log("ID do usuário:", usuarioID);
    // Continuar com o processo de pagamento
} else {
    console.log("Usuário não autenticado!");
    // Redirecionar para login ou exibir mensagem de erro
}

// Função para formatar o número do cartão de crédito
function formatarCartao(event) {
    const input = event.target;
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é número

    input.value = valor;
}

// Função para validar o CVV (3 dígitos)
function validarCVV(event) {
    const input = event.target;
    input.value = input.value.replace(/\D/g, ''); // Permite apenas números
    if (input.value.length > 3) {
        input.value = input.value.slice(0, 3); // Limita a 3 dígitos
    }
}

// Função para formatar e validar a validade (MM/AA)
function formatarValidade(event) {
    const input = event.target;
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é número

    // Adiciona a barra entre MM e AA
    if (valor.length > 2) {
        valor = valor.slice(0, 2) + '/' + valor.slice(2, 4);
    }

    // Verifica se o mês está válido (01-12)
    const mes = valor.slice(0, 2);
    if (parseInt(mes) > 12) {
        input.setCustomValidity("Mês inválido");
    } else {
        input.setCustomValidity("");
    }

    input.value = valor;
}

// Verifica se a data de validade é menor que a data atual (cartão vencido)
document.getElementById("validade").addEventListener("blur", function(event) {
    const validade = event.target.value;
    if (validade.length === 5) { // Caso a data tenha o formato MM/AA
        const mes = parseInt(validade.slice(0, 2), 10);
        const ano = parseInt(validade.slice(3, 5), 10) + 2000; // Ano completo (ex: 24 -> 2024)

        // Data atual
        const dataAtual = new Date();
        const mesAtual = dataAtual.getMonth() + 1; // getMonth() retorna 0-11
        const anoAtual = dataAtual.getFullYear();

        // Verifica se a data de validade é menor que a data atual
        if (ano < anoAtual || (ano === anoAtual && mes < mesAtual)) {
            alert("Cartão vencido! A data de validade está abaixo da data atual.");
            event.target.value = ""; // Limpa o campo em caso de erro
        } else if (mes < 1 || mes > 12) {
            alert("Mês inválido! O mês deve estar entre 01 e 12.");
            event.target.value = ""; // Limpa o campo em caso de erro
        }
    }
});

// Event listeners para os campos
document.getElementById("cartao").addEventListener("input", formatarCartao);
document.getElementById("cvv").addEventListener("input", validarCVV);
document.getElementById("validade").addEventListener("input", formatarValidade);

// Usando a função para pegar o cookie 'usuarioID'
const usuarioId = getCookieById();
console.log('ID do Usuário encontrado no cookie:', usuarioId);

// Preencher o campo oculto com o ID do usuário se ele existir
if (usuarioId) {
    const usuarioIDInput = document.getElementById("usuarioID");
    if (usuarioIDInput) {
        usuarioIDInput.value = usuarioId;  // Preenche o campo oculto
    }
}

// Finalizar pagamento
document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede o comportamento padrão de envio

    // Obtendo os dados do formulário
    const total = parseFloat(localStorage.getItem("totalPagamento"));
    const email = document.getElementById("email").value;
    const endereco = document.getElementById("endereco").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const id = document.getElementById("usuarioID").value;
    const quantidade = document.getElementById("qtd").value // Obtém o valor do campo "qtd"

    // Exibe os dados no console, incluindo o ID do usuário (que agora está no campo oculto)
    console.log( total, email, endereco, cidade, estado, id,quantidade);

    // Criando o objeto pagamento com os campos necessários
    const pagamento = {
        id_usuario: parseInt(id), // Converte o id do usuário para inteiro
        email: email,
        endereco: endereco,
        cidade: cidade,
        estado: estado,
        quantidade: parseInt(quantidade), // Converte a quantidade para inteiro
        total: totalPagamento // Já é um número decimal
    };

    // Envia os dados para a API
    fetch("http://localhost:8080/pagar", {  
        method:'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pagamento)
    })
    .then(response => {
        console.log(response);
        if (response.status === 200) {
            alert("Pagamento efetuado com sucesso! ^^");
        } else {
            alert("Erro ao efetuar pagamento :(");
        }
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Ocorreu um erro na requisição.");
    });
});
