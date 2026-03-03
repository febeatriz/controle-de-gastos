package com.fernanda.controle_gastos.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fernanda.controle_gastos.entity.TipoTransacao;
import com.fernanda.controle_gastos.entity.Transacao;
import com.fernanda.controle_gastos.repository.TransacaoRepository;

@Service
public class TransacaoService {
    private final TransacaoRepository repository;

    public TransacaoService(TransacaoRepository repository){
        this.repository = repository;
    }
    public Transacao salvar(Transacao transacao){
        return repository.save(transacao);
    }
    public void deletar(Long id){
        repository.deleteById(id);
    }
    public List<Transacao> listarPorMes(int mes, int ano){
        LocalDate inicio = LocalDate.of(ano, mes, 1);
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth());
        return repository.findByDataBetween(inicio, fim);
    }
    public Map<String, BigDecimal> resumoMensal(int mes, int ano){
        List<Transacao> transacoes = listarPorMes(mes, ano);
        BigDecimal receitas = transacoes.stream()
            .filter(t -> t.getTipo() == TipoTransacao.RECEITA)
            .map(Transacao::getValor)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal despesas =transacoes.stream()
            .filter(t -> t.getTipo() == TipoTransacao.DESPESA)
            .map(Transacao::getValor)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal investimentos =transacoes.stream()
            .filter(t-> t.getTipo() == TipoTransacao.INVESTIMENTO)
            .map(Transacao::getValor)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal saldo = receitas.subtract(despesas).subtract(investimentos);

        Map<String, BigDecimal> resumo = new HashMap<>();
        resumo.put("receitas", receitas);
        resumo.put("despesas", despesas);
        resumo.put("investimentos", investimentos);
        resumo.put("saldo", saldo);
        return resumo;

    }
    public List<Transacao> listarTodas() {
        return repository.findAll();
    }
    

}
