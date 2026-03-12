package com.fernanda.controle_gastos.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fernanda.controle_gastos.dto.TransacaoRequestDTO;
import com.fernanda.controle_gastos.entity.Categoria;
import com.fernanda.controle_gastos.entity.TipoTransacao;
import com.fernanda.controle_gastos.entity.Transacao;
import com.fernanda.controle_gastos.repository.CategoriaRepository;
import com.fernanda.controle_gastos.repository.TransacaoRepository;

@Service
public class TransacaoService {
    private final TransacaoRepository transacaoRepository;
    private final CategoriaRepository categoriaRepository;

    public TransacaoService(TransacaoRepository transacaoRepository,
            CategoriaRepository categoriaRepository) {
        this.transacaoRepository = transacaoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public void salvar(TransacaoRequestDTO dto) {
        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        boolean recorrente = dto.getRecorrente() != null && dto.getRecorrente();
        int quantidadeMeses = dto.getQuantidadeMeses() != null ? dto.getQuantidadeMeses() : 1;

        if (dto.getTipo() == TipoTransacao.DESPESA && recorrente) {
            for (int i = 0; i < quantidadeMeses; i++) {
                Transacao transacao = new Transacao();
                transacao.setDescricao(dto.getDescricao());
                transacao.setValor(dto.getValor());
                transacao.setData(dto.getData().plusMonths(i));
                transacao.setTipo(dto.getTipo());
                transacao.setCategoria(categoria);

                transacaoRepository.save(transacao);
            }
        } else {
            Transacao transacao = new Transacao();
            transacao.setDescricao(dto.getDescricao());
            transacao.setValor(dto.getValor());
            transacao.setData(dto.getData());
            transacao.setTipo(dto.getTipo());
            transacao.setCategoria(categoria);

            transacaoRepository.save(transacao);
        }
    }

    public void deletar(Long id) {
        transacaoRepository.deleteById(id);
    }

    public List<Transacao> listarPorMes(int mes, int ano) {
        LocalDate inicio = LocalDate.of(ano, mes, 1);
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth());
        return transacaoRepository.findByDataBetween(inicio, fim);
    }

    public List<Transacao> listarTodas() {
        return transacaoRepository.findAll();
    }

    public Map<String, BigDecimal> resumoMensal(int mes, int ano) {
        List<Transacao> transacoes = listarPorMes(mes, ano);

        BigDecimal receitas = transacoes.stream()
                .filter(t -> t.getTipo() == TipoTransacao.RECEITA)
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal despesas = transacoes.stream()
                .filter(t -> t.getTipo() == TipoTransacao.DESPESA)
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal investimentos = transacoes.stream()
                .filter(t -> t.getTipo() == TipoTransacao.INVESTIMENTO)
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
}