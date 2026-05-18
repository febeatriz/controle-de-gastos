package com.fernanda.controle_gastos.repository.jpa; // Pacote atualizado

import org.springframework.data.jpa.repository.JpaRepository;
import com.fernanda.controle_gastos.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}