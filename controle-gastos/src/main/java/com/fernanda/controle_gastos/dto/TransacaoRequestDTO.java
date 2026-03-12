package com.fernanda.controle_gastos.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fernanda.controle_gastos.entity.TipoTransacao;

public class TransacaoRequestDTO {
    private String descricao;
    private BigDecimal valor;
    private LocalDate data;
    private TipoTransacao tipo;
    private Long categoriaId;
    private Boolean recorrente;
    private Integer quantidadeMeses;

    public TransacaoRequestDTO() {
    }

    public String getDescricao() {
        return descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public LocalDate getData() {
        return data;
    }

    public TipoTransacao getTipo() {
        return tipo;
    }

    public Long getCategoriaId() {
        return categoriaId;
    }

    public Boolean getRecorrente() {
        return recorrente;
    }

    public Integer getQuantidadeMeses() {
        return quantidadeMeses;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public void setTipo(TipoTransacao tipo) {
        this.tipo = tipo;
    }

    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }

    public void setRecorrente(Boolean recorrente) {
        this.recorrente = recorrente;
    }

    public void setQuantidadeMeses(Integer quantidadeMeses) {
        this.quantidadeMeses = quantidadeMeses;
    }
}