const toggleSenha = document.getElementById("toggleSenha");
        const inputSenha = document.getElementById("senha");

        toggleSenha.addEventListener("click", () => {
            // Alternar o tipo de input entre 'password' e 'text'
            if (inputSenha.type === "password") {
                inputSenha.type = "text";
                toggleSenha.classList.remove("bxs-lock-alt");
                toggleSenha.classList.add("bxs-lock-open-alt");
            } else {
                inputSenha.type = "password";
                toggleSenha.classList.remove("bxs-lock-open-alt");
                toggleSenha.classList.add("bxs-lock-alt");
            }
        });
