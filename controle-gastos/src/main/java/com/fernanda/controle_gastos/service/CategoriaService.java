package com.fernanda.controle_gastos.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.fernanda.controle_gastos.entity.Categoria;
import com.fernanda.controle_gastos.repository.jpa.CategoriaRepository; // Import atualizado

@Service
public class CategoriaService {
    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    public List<Categoria> listarTodas() {
        return repository.findAll();
    }
}