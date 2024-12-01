package com.anhembi.livraria_a3.Controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class PaginaController {


    @GetMapping("/carrinho")
    public String car() {
        return "carrinho"; 
    }
    @GetMapping("/pagamento")
    public String pagamento() {
        return "pagamento"; 
    }
    @GetMapping("/cadastro")
    public String cadastro() {
        return "cadastro"; 
    }
    @GetMapping("/usuario")
    public String usuario() {
        return "usuario"; 
    }
    @GetMapping("/perfil")
    public String perfil() {
        return "EdicaoConta"; 
    }
    @GetMapping("/portifolio/gloria")
    public String gloria() {
        return "portifolioGloria"; 
    }

    @GetMapping("/portifolio/gabriel")
    public String gabriel(){
        return "index";
    }
    @GetMapping("/portifolio/gabriel/quem")
    public String quem(){
        return "quemsou";
    }
    @GetMapping("/portifolio/gabriel/formacoes")
    public String formacao(){
        return "formacoes";
    }
    @GetMapping("/portifolio/gabriel/contatos")
    public String contatos(){
        return "contatos";
    }
}
