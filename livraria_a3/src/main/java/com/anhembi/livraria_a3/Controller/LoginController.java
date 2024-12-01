package com.anhembi.livraria_a3.Controller;
import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.ui.Model;

import com.anhembi.livraria_a3.DAO.IUsuario;
import com.anhembi.livraria_a3.model.Usuario;
import com.anhembi.livraria_a3.service.CookieService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



@Controller
public class LoginController {
    @Autowired
    private IUsuario DAO;

   @GetMapping("/login")
   public String login(){
    return "login";
    }

    @GetMapping("/site")
public String site(Model model,HttpServletRequest request) throws UnsupportedEncodingException {
    model.addAttribute("nome", CookieService.getCookie(request, "nome"));
    String usuarioID = CookieService.getCookie(request, "usuarioID");
    model.addAttribute("usuarioID", usuarioID);
    return "site"; 
}
/*o que ele vai fazer a partir de um metodo post */
    @PostMapping ("/logar")
    public String logar(Model model, Usuario userParam, String lembrar, HttpServletResponse response) throws UnsupportedEncodingException {
  /*o http response pega a responsta da sua url */


        Usuario user = this.DAO.login(userParam.getEmail(), userParam.getSenha() );
        if (user != null) { 
            
            /*fazer um cookie */
            CookieService.setCookie(response, "usuarioID", String.valueOf(user.getId()), 10000);
            CookieService.setCookie(response, "nome", String.valueOf(user.getNome()), 10000);
            return "redirect:/site"; 
        }
        model.addAttribute("erro", "Usuario ou senha invalidos");
        return"login";
    }
}
