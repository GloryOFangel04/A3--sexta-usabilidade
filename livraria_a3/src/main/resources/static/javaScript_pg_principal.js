searchForm = document.querySelector('.forms-pesquisa');
document.getElementById('logoutButton').addEventListener('click', function (event) {
    event.preventDefault(); // Impede o comportamento padrão do link, se existir.
    
    // Limpa os dados de sessão ou armazenamento local (opcional)
    localStorage.clear(); // Limpa o armazenamento local
    sessionStorage.clear(); // Limpa a sessão

    // Redireciona o usuário para a página de login
    window.location.href = 'http://localhost:8080/login';
});




document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
}

window.onscroll = () => {
    searchForm.classList.remove('active');
    if (window.scrollY > 80) {
        document.querySelector('.header .header-2').classList.add('active');
    } else {
        document.querySelector('.header .header-2').classList.remove('active');
    }
};
window.onload = () => {
    if (window.scrollY > 80) {
        document.querySelector('.header .header-2').classList.add('active');
    } else {
        document.querySelector('.header .header-2').classList.remove('active');
    }
};
var swiper = new Swiper(".book-slider", {
    loop: true,
    centeredSlides: true, // Correção aqui
    autoplay: {
        delay: 1000,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
           
        },
        768: {
            slidesPerView: 2,
           
        },
        1024: {
            slidesPerView: 3,
            
        },
    },
});


var swiper = new Swiper(".featured-slider", {
    spaceBetween:10,
    loop: true,
    centeredSlides: true, // Correção aqui
    autoplay: {
        delay: 1000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    breakpoints: {
        0: {
            slidesPerView: 1,
           
        },
        450: {
            slidesPerView: 2,
           
        },
        768: {
            slidesPerView: 3,
           
        },
        1024: {
            slidesPerView: 4,
            
        },
    },
});

var swiper = new Swiper(".arrivals-slider", {
    spaceBetween:10,
    loop: true,
    centeredSlides: true, // Correção aqui
    autoplay: {
        delay: 9500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
           
        },
        768: {
            slidesPerView: 2,
           
        },
        1024: {
            slidesPerView: 3,
            
        },
    },
});

var swiper = new Swiper(".reviews-slider", {
    spaceBetween:10,
    loop: true,
    centeredSlides: true, // Correção aqui
    autoplay: {
        delay: 9500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
           
        },
        768: {
            slidesPerView: 2,
           
        },
        1024: {
            slidesPerView: 3,
            
        },
    },
});

let cart = localStorage.getItem('cart') 
            ? JSON.parse(localStorage.getItem('cart')) 
            : {};

// Atualiza o contador na inicialização da página
let cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
document.getElementById('cart-count').textContent = cartCount;

function addToCart(event) {
    event.preventDefault();

    // Identifica o ID do produto
    const productId = event.target.getAttribute('data-id');

    // Incrementa a quantidade do produto no carrinho
    if (cart[productId]) {
        cart[productId]++;
    } else {
        cart[productId] = 1;
    }

    // Salva no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza o contador geral
    cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
    let qtd = cartCount;
    localStorage.setItem('qtd', qtd)
    // Exibe a notificação
    showNotification("Item adicionado ao carrinho!");

   
}

function showNotification(message) {
    let existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;

    document.body.appendChild(notification);
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
        document.body.removeChild(notification);
    }, 1000);
}
