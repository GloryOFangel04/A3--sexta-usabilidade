package com.anhembi.livraria_a3.DAO;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.anhembi.livraria_a3.model.Compra;

@Repository
public interface CompraRepository extends CrudRepository<Compra, Integer>  {

}
