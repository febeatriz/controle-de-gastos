package com.fernanda.controle_gastos.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.*;

import com.fernanda.controle_gastos.dto.CategoriaResponseDTO;
import com.fernanda.controle_gastos.service.CategoriaService;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    private final CategoriaService service;

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    @GetMapping
    public List<CategoriaResponseDTO> listar() {
        return service.listarTodas().stream()
                .map(c -> new CategoriaResponseDTO(c.getId(), c.getNome()))
                .collect(Collectors.toList());
    }
}