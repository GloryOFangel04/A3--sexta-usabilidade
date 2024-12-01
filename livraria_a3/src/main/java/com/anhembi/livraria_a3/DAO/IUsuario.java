package com.anhembi.livraria_a3.DAO;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.anhembi.livraria_a3.model.Usuario;


/*ele  */

@Repository
public interface IUsuario extends CrudRepository <Usuario, Integer > {
 
    @Query(value = "SELECT CASE WHEN COUNT(1) > 0 THEN 'true' ELSE 'false' END FROM usuario WHERE id_usuario = :id", nativeQuery = true)
   public boolean exist( int id);

    @Query(value = "select * from usuario where email = :email and senha = :senha ", nativeQuery = true)
   public Usuario login( String email, String senha );
/*aqui ele vai no banco de dados e verifica se tem, se encontrar, ele volta e converte em um obj usuario   */
 
    
}
