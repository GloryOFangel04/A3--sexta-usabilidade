package com.anhembi.livraria_a3.service.autenticador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class LoginInteceptionAppConfig implements WebMvcConfigurer {

    @Autowired
    private LoginInteception logininterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) { // Corrigido o método
        registry.addInterceptor(logininterceptor).excludePathPatterns(
                "/login",        // Página de login
                "/logar",        // Ação de login
                    "/error",        // Página de erro
                    "/css/**",       // Todos os arquivos CSS
                    "/js/**",        // Todos os arquivos JavaScript
                    "/images/**",    // Todos os arquivos de imagem
                "/loginStyle.css", // Arquivo CSS específico (caso necessário)
                "/login.js",
                "/cadastro",
                "/styleCadastro.css",
                "/image/**",  // Arquivo JS específico (caso necessário)
                "/cadastroScript.js"
                
        );
    }
}
