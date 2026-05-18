package com.fernanda.controle_gastos.config;

import com.fernanda.controle_gastos.entity.Usuario;
import com.fernanda.controle_gastos.repository.mongo.UsuarioRepository; // <-- Import corrigido aqui!
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MongoInitConfig {

    @Bean
    public CommandLineRunner initUser(UsuarioRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                Usuario admin = new Usuario();
                admin.setUserName("fefe");      // O seu usuário do app
                admin.setPassword("f3f3"); // A senha do seu usuário fefe
                repository.save(admin);
                System.out.println("Usuário padrão criado com sucesso no MongoDB!");
            }
        };
    }
}