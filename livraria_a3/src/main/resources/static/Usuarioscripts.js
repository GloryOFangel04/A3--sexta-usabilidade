document.addEventListener("DOMContentLoaded", () => {
  const userName = document.getElementById("user-name");
  const lastOrderDetails = document.getElementById("last-order-details");

  const btnLogout = document.getElementById("btn-logout");
  const btnDeleteAccount = document.getElementById("btn-delete-account");

  // Função para pegar o valor de um cookie pelo nome
  function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
  }

  document.getElementById('btn-edit-profile').addEventListener('click', function () {
    window.location.href = 'http://localhost:8080/perfil';
});


  // Pegando o nome do usuário do cookie
  const userNameCookie = getCookie('nome'); // A chave que você usou para armazenar o nome no cookie

  if (userNameCookie) {
      // Se o cookie de nome estiver presente, exibe o nome do usuário
      userName.textContent = userNameCookie;
  } else {
      // Caso contrário, redireciona para o login
      window.location.href = "/login";
  }

  // Lógica para o botão de logout
  if (btnLogout) {
      btnLogout.addEventListener("click", () => {
          // Quando o botão de logout for clicado, remova o cookie de login e redirecione para o login
          document.cookie = "usuarioID=; max-age=0; path=/"; // Remove o cookie de usuário
          document.cookie = "nome=; max-age=0; path=/"; // Remove o cookie de nome
          window.location.href = "/login"; // Redireciona para o login
      });
  }

  // Lógica para o botão de exclusão de conta (apenas se necessário)
  if (btnDeleteAccount) {
      btnDeleteAccount.addEventListener("click", () => {
          // Aqui você pode adicionar a lógica de exclusão de conta, se necessário
          alert("Função de exclusão de conta ainda não implementada.");
      });
  }
});
