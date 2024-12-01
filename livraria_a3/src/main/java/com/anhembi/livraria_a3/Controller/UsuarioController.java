package com.anhembi.livraria_a3.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anhembi.livraria_a3.DAO.IUsuario;
import com.anhembi.livraria_a3.model.Usuario;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
/*se você não colocar vai dar erro e você não vai entender o pq  */
@CrossOrigin("*")
@RequestMapping("/usuarios")
public class UsuarioController  {


    /*inserção automatica das dependencias ai eu não implemento na mão */
        @Autowired
        private IUsuario DAO;

        @GetMapping
        public List<Usuario> ListaUsuario() {
            return (List<Usuario>)  DAO.findAll();
        }

        @PostMapping
        public Usuario criarUsuario(@RequestBody Usuario usuario) {
            Usuario usuarioNovo = DAO.save(usuario);
            return usuarioNovo;
           
        }
        
        @PutMapping
        public Usuario editarUsuario(@RequestBody Usuario usuario) {
            Usuario usuarioNovo = DAO.save(usuario);
            return usuarioNovo;
           
        }

        @DeleteMapping("/{id}")
        public  Optional <Usuario> exclUsuario (@PathVariable Integer id){
            Optional<Usuario> usuario = DAO.findById(id);
            DAO.deleteById(id);
            return usuario;
        }

      
        }
