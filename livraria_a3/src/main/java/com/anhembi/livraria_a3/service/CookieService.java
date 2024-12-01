package com.anhembi.livraria_a3.service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.Optional;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CookieService {
public static void setCookie(HttpServletResponse response, String key, String valor, int segundos) throws UnsupportedEncodingException{
    Cookie cookie = new Cookie(key, URLEncoder.encode(valor,"UTF-8"));
    cookie.setMaxAge(segundos);
    response.addCookie(cookie);
}
public static String getCookie(HttpServletRequest request, String key) throws UnsupportedEncodingException {
    // Procura pelo cookie correspondente e obtém seu valor
    String valor = Optional.ofNullable(request.getCookies()) // Obtém os cookies
        .flatMap(cookies -> Arrays.stream(cookies) // Transforma em stream
            .filter(cookie -> key.equals(cookie.getName())) // Filtra pelo nome
            .findAny()) // Busca o primeiro que atende a condição
        .map(e -> e.getValue()) // Obtém o valor do cookie
        .orElse(null); 

    // Decodifica o valor se ele não for nulo
    if (valor != null) {
        valor = URLDecoder.decode(valor, "UTF-8"); // Decodifica o valor do cookie
    }

    return valor; // Retorna o valor do cookie (ou null)
}
}
