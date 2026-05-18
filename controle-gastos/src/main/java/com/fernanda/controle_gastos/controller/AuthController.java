package com.fernanda.controle_gastos.controller;

import com.fernanda.controle_gastos.dto.LoginRequestDTO;
import com.fernanda.controle_gastos.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // Essencial para o React não ser bloqueado (CORS)
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO dto) {
        boolean isValido = authService.validarLogin(dto.getUsername(), dto.getPassword());

        if (isValido) {
            // Retorna status 200 OK
            return ResponseEntity.ok("Login realizado com sucesso");
        } else {
            // Retorna status 401 Unauthorized
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha incorretos");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // Retorna status 200 OK para confirmar logout
        return ResponseEntity.ok("Logout realizado com sucesso");
    }
}