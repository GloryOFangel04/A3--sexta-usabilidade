package com.anhembi.livraria_a3.service.autenticador;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.anhembi.livraria_a3.service.CookieService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class LoginInteception implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException{

        if(CookieService.getCookie(request, "usuarioID")!= null){
            return true;
        }
        response.sendRedirect("/login");
        return false;
    }

}
