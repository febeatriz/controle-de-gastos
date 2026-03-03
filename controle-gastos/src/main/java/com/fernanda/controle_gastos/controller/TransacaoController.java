package com.fernanda.controle_gastos.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.fernanda.controle_gastos.entity.Categoria;
import com.fernanda.controle_gastos.entity.Transacao;
import com.fernanda.controle_gastos.service.TransacaoService;

@RestController
@RequestMapping("/transacoes")
@CrossOrigin(origins = "*")
public class TransacaoController {

    private final TransacaoService service;

    public TransacaoController(TransacaoService service) {
        this.service = service;
    }

    @PostMapping
    public Transacao criar(@RequestBody Transacao transacao) {
        return service.salvar(transacao);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

    @GetMapping("/mes")
    public List<Transacao> listarPorMes(@RequestParam int mes,
            @RequestParam int ano) {
        return service.listarPorMes(mes, ano);
    }
    
    @GetMapping
    public List<Transacao> listar() {
        return service.listarTodas();
    }

    @GetMapping("/resumo")
    public String resumo(@RequestParam int mes,
            @RequestParam int ano) {
        return service.resumoMensal(mes, ano);
    }

    @GetMapping("/categorias")
    public Categoria[] listarCategorias() {
        return Categoria.values();
    }
}