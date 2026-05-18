package com.fernanda.controle_gastos.service;

import com.fernanda.controle_gastos.entity.Usuario;
import com.fernanda.controle_gastos.repository.mongo.UsuarioRepository; // Import atualizado
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;

    // Injeção via construtor para manter a consistência com os outros serviços
    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public boolean validarLogin(String username, String senha) {
        return usuarioRepository.findByUserName(username)
                .map(user -> user.getPassword().equals(senha))
                .orElse(false);
    }
}