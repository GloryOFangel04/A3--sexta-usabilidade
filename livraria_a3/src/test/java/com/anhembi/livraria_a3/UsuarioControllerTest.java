package com.anhembi.livraria_a3;

import com.anhembi.livraria_a3.Controller.UsuarioController;
import com.anhembi.livraria_a3.model.Usuario;
import com.anhembi.livraria_a3.DAO.IUsuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class UsuarioControllerTest {

    @Mock
    private IUsuario dao; // Simulando a interface DAO

    @InjectMocks
    private UsuarioController usuarioController; // O controlador que va ser testado

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Inicializa os mocks (não precisei instalar graças ao spring boot test)
    }

    // Teste para o método ListaUsuario()
    @Test
    void testListaUsuario() {
        // Criando 2 objetos de usuário para testar


        Usuario usuario1 = new Usuario();
        usuario1.setId(1);
        usuario1.setNome("João");
        usuario1.setSobrenome("Silva");
        usuario1.setEmail("joao@example.com");
        usuario1.setSenha("123456");
        usuario1.setCelular("123456789");
        usuario1.setGenero("Masculino");

        Usuario usuario2 = new Usuario();
        usuario2.setId(2);
        usuario2.setNome("Maria");
        usuario2.setSobrenome("Oliveira");
        usuario2.setEmail("maria@example.com");
        usuario2.setSenha("senha123");
        usuario2.setCelular("987654321");
        usuario2.setGenero("Feminino");

        // Simulando o comportamento do DAO ou repository (deveria ter mudado esse nome)
        List<Usuario> usuarios = new ArrayList<>();
        usuarios.add(usuario1);
        usuarios.add(usuario2);
        when(dao.findAll()).thenReturn(usuarios);

        // Chama o método que está sendo testado
        List<Usuario> result = usuarioController.ListaUsuario();

        // Verifica se o retorno está correto
        assertEquals(2, result.size()); // Instrução 1: Verifica a quantidade de usuários
        assertEquals("João", result.get(0).getNome()); // Instrução 2: Verifica o nome do primeiro usuário
        assertEquals("Maria", result.get(1).getNome()); // Instrução 3: Verifica o nome do segundo usuário

        // Verifica se o método DAO foi chamado corretamente
        verify(dao, times(1)).findAll(); // Instrução 4: Verifica se o DAO foi chamado
    }

    // Teste para o método criarUsuario()
    @Test
    void testCriarUsuario() {
        // Criando um novo usuário
        Usuario usuarioNovo = new Usuario();
        usuarioNovo.setNome("Carlos");
        usuarioNovo.setSobrenome("Pereira");
        usuarioNovo.setEmail("carlos@example.com");
        usuarioNovo.setSenha("senha789");
        usuarioNovo.setCelular("123456789");
        usuarioNovo.setGenero("Masculino");

       
        when(dao.save(usuarioNovo)).thenReturn(usuarioNovo);

        
        Usuario resultado = usuarioController.criarUsuario(usuarioNovo);

        // Verifica se o retorno está correto
        assertNotNull(resultado); // Instrução 1: Verifica se o resultado é != de nulo 
        assertEquals("Carlos", resultado.getNome()); // Instrução 2: Verifica o nome do usuário criado

        
        verify(dao, times(1)).save(usuarioNovo); 
    }

    // Teste para o método editarUsuario() o auge da minha cara de pau é deixar o metodo criado e não implementado no site bjs
    @Test
    void testEditarUsuario() {
        // Criando um usuário para editar
        Usuario usuarioEditado = new Usuario();
        usuarioEditado.setId(1);
        usuarioEditado.setNome("João Editado");
        usuarioEditado.setSobrenome("Silva Editado");
        usuarioEditado.setEmail("joaoedited@example.com");
        usuarioEditado.setSenha("novaSenha123");
        usuarioEditado.setCelular("111223344");
        usuarioEditado.setGenero("Masculino");

        
        when(dao.save(usuarioEditado)).thenReturn(usuarioEditado);

        
        Usuario resultado = usuarioController.editarUsuario(usuarioEditado);

        // Verifica se as mudanças foram aplicadas corretamente
        assertEquals("João Editado", resultado.getNome()); // Instrução 1: Verifica se o nome foi alterado
        assertEquals("joaoedited@example.com", resultado.getEmail()); // Instrução 2: Verifica se o email foi alterado

        // Verifica se o método DAO foi chamado corretamente dn
        verify(dao, times(1)).save(usuarioEditado); // Instrução 3: Verifica se o save foi chamado
    }

    // Teste para o método exclUsuario()
    @Test
    void testExclUsuario() {
        // Criando um usuário para excluir
        Usuario usuarioParaExcluir = new Usuario();
        usuarioParaExcluir.setId(1);
        usuarioParaExcluir.setNome("João");
        usuarioParaExcluir.setSobrenome("Silva");
        usuarioParaExcluir.setEmail("joao@example.com");
        usuarioParaExcluir.setSenha("123456");
        usuarioParaExcluir.setCelular("123456789");
        usuarioParaExcluir.setGenero("Masculino");

      
        when(dao.findById(1)).thenReturn(Optional.of(usuarioParaExcluir));

        
        Optional<Usuario> resultado = usuarioController.exclUsuario(1);

        // Verifica se o usuário foi excluído
        assertTrue(resultado.isPresent()); // Instrução 1: Verifica se o usuário existe antes de ser excluído
        assertEquals("João", resultado.get().getNome()); // Instrução 2: Verifica o nome do usuário excluído

        
        verify(dao, times(1)).deleteById(1); // Instrução 3: Verifica se o delete foi chamado
    }
}
