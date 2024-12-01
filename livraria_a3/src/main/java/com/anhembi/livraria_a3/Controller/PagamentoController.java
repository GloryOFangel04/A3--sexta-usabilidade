package com.anhembi.livraria_a3.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anhembi.livraria_a3.DAO.CompraRepository;
import com.anhembi.livraria_a3.model.Compra;

@RestController
@CrossOrigin("*")
@RequestMapping("/pagar")
public class PagamentoController {

    @Autowired
    private CompraRepository DAO;

    @GetMapping
    public List<Compra> listaCompras() {
        return (List<Compra>) DAO.findAll();
    }

    @PostMapping
    public Compra novaCompra(@RequestBody Compra compra) {
        Compra compraNova = DAO.save(compra);
        return compraNova;
    }
}
