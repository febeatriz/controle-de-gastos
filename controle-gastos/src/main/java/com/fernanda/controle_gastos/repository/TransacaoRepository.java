package com.fernanda.controle_gastos.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fernanda.controle_gastos.entity.Transacao;

public interface TransacaoRepository extends JpaRepository<Transacao, Long>{
    List<Transacao> findByDataBetween(LocalDate inicio, LocalDate fim);
    
}
