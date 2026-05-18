package com.fernanda.controle_gastos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
// Anotações essenciais para direcionar cada banco ao seu pacote correto
@EnableJpaRepositories(basePackages = "com.fernanda.controle_gastos.repository.jpa")
@EnableMongoRepositories(basePackages = "com.fernanda.controle_gastos.repository.mongo")
public class ControleGastosApplication {
    public static void main(String[] args) {
        SpringApplication.run(ControleGastosApplication.class, args);
    }
}