package com.fernanda.controle_gastos.repository.mongo; // Pacote atualizado

import com.fernanda.controle_gastos.entity.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Optional<Usuario> findByUserName(String userName);
}