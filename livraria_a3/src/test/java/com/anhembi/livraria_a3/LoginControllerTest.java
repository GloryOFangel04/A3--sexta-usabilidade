package com.anhembi.livraria_a3;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.ui.Model;

import com.anhembi.livraria_a3.Controller.LoginController;
import com.anhembi.livraria_a3.DAO.IUsuario;
import com.anhembi.livraria_a3.model.Usuario;

import jakarta.servlet.http.HttpServletResponse;

public class LoginControllerTest {


    @Mock
    private IUsuario DAO;

    @Mock
    private Model model;

    @Mock
    private HttpServletResponse response;

    @InjectMocks
    private LoginController loginController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoginSuccess() throws Exception {
        Usuario user = new Usuario();
        user.setId(1); // converter para interger já q em usuario ta interger 
        user.setNome("João");
        user.setEmail("joao@exemplo.com");
        user.setSenha("senha123");

        when(DAO.login("joao@exemplo.com", "senha123")).thenReturn(user);

        String resultado = loginController.logar(model, user, "true", response);

        assertEquals("redirect:/site", resultado);
        verify(response, times(2)).addCookie(any());
    }

    @Test
    void testLoginFailure() throws Exception {
        when(DAO.login("joao@exemplo.com", "senhaErrada")).thenReturn(null);

        Usuario user = new Usuario();
        user.setEmail("joao@exemplo.com");
        user.setSenha("senhaErrada");

        String resultado = loginController.logar(model, user, "true", response);

        assertEquals("login", resultado);
        verify(model).addAttribute("erro", "Usuario ou senha invalidos");
    }
}

