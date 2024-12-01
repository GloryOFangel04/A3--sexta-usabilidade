document.addEventListener("DOMContentLoaded", () => {
    const cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : {};

    // Atualiza os valores de quantidade e preços na página
    Object.keys(cart).forEach(productId => {
        const quantityInput = document.getElementById(`quantity-${productId}`);
        const priceElement = document.getElementById(`price-${productId}`);
        const originalPrice = parseFloat(priceElement.dataset.originalPrice);

        if (quantityInput) {
            quantityInput.value = cart[productId];
        }

        if (priceElement) {
            const totalPrice = (originalPrice * cart[productId]).toFixed(2);
            priceElement.textContent = `R$${totalPrice.replace(".", ",")}`;
        }
    });

    // Adiciona evento de input para atualizar preços em tempo real
    document.querySelectorAll(".quantity-input").forEach(input => {
        input.addEventListener("input", event => {
            const productId = event.target.id.split("-")[1]; // Extrai o ID do produto
            const quantity = parseInt(event.target.value) || 0;
            const priceElement = document.getElementById(`price-${productId}`);
            const originalPrice = parseFloat(priceElement.dataset.originalPrice);

            if (quantity <= 0) {
                event.target.value = 0;
                priceElement.textContent = "R$00,00";
                delete cart[productId]; // Remove do carrinho
            } else {
                cart[productId] = quantity; // Atualiza o carrinho
                priceElement.textContent = `R$${(originalPrice * quantity).toFixed(2).replace(".", ",")}`;
            }

            // Atualiza o carrinho no localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Recalcula o total
            updateCartTotal();
        });
    });

    // Atualiza o total do carrinho
    updateCartTotal();
});

// Variável global para armazenar o total de pagamento
let totalPagamento = 0;

// Função para calcular o total do carrinho
function updateCartTotal() {
    let total = 0;

    document.querySelectorAll(".cart-item").forEach(item => {
        const quantity = parseInt(item.querySelector(".quantity-input").value) || 0;
        const price = parseFloat(item.querySelector(".price").getAttribute("data-original-price"));

        if (quantity > 0) {
            total += quantity * price;
        }
    });

    // Exibindo o valor no carrinho
    document.getElementById("total-price").textContent = `R$${total.toFixed(2).replace(".", ",")}`;

    // Armazenando o total no localStorage
    localStorage.setItem("cartTotal", total.toFixed(2));

    // Atualiza a variável totalPagamento
    totalPagamento = total;
}

document.querySelectorAll('.quantity-input').forEach((input) => {
    input.addEventListener('input', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        const bookId = input.id; // Usa o ID do input para identificar o livro
        const quantity = parseInt(input.value);

        if (quantity > 0) {
            cart[bookId] = quantity; // Atualiza a quantidade no carrinho
        } else {
            delete cart[bookId]; // Remove itens com quantidade 0
        }

        // Salva o carrinho atualizado no localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Atualiza a quantidade total no localStorage
        const totalQuantity = Object.values(cart).reduce((sum, qty) => sum + parseInt(qty), 0);
        localStorage.setItem('totalQuantity', totalQuantity);
    });
});

// Função para redirecionar para a página de pagamento e salvar o total
function goToPayment() {
    // Verifica se o totalPagamento é zero
    if (totalPagamento === 0) {
        alert("Seu carrinho está vazio! Adicione itens antes de continuar para o pagamento.");
        return; // Interrompe a execução da função
    }

    // Armazenando o valor de totalPagamento no localStorage para ser acessado na página de pagamento
    localStorage.setItem("totalPagamento", totalPagamento.toFixed(2));
    window.location.href = "http://localhost:8080/pagamento"; 
}
