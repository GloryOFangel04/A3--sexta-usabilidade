package com.anhembi.livraria_a3.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "usuario")
@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer id;

    @Column(name = "nome", length = 50, nullable = true)
    @JsonProperty("nome")
    private String nome;

    @Column(name = "sobrenome", length = 50, nullable = true)
    @JsonProperty("sobrenome")
    private String sobrenome;
    
    @Column(name = "email", length = 100, nullable = true)
    @JsonProperty("email")
    private String email;

    @Column(name = "senha", length = 255, nullable = true)
    @JsonProperty("senha")
    private String senha;

    @Column(name = "celular", length = 20, nullable = true)
    @JsonProperty("celular")
    private String celular;

    @Column(name = "genero", length = 10, nullable = true)
    @JsonProperty("genero")
    private String genero;

    // Getters e Setters

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getSobrenome() {
        return sobrenome;
    }
    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }
    public String getCelular() {
        return celular;
    }
    public void setCelular(String celular) {
        this.celular = celular;
    }
    
    public String getGenero() {
        return genero;
    }
    public void setGenero(String genero) {
        this.genero = genero;
    }
}
