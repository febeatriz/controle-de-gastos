const API_BASE = "https://controle-de-gastos-xvl2.onrender.com";

export const buscarTodas = async () => {
    const response = await fetch(`${API_BASE}/transacoes`);
    if (!response.ok) throw new Error("Erro ao buscar transações.");
    return response.json();
};

export const buscarPorMes = async (mes, ano) => {
    const response = await fetch(`${API_BASE}/transacoes/mes?mes=${mes}&ano=${ano}`);
    if (!response.ok) throw new Error("Erro ao buscar transações do mês.");
    return response.json();
};

export const buscarResumo = async (mes, ano) => {
    const response = await fetch(`${API_BASE}/transacoes/resumo?mes=${mes}&ano=${ano}`);
    if (!response.ok) throw new Error("Erro ao buscar resumo.");
    return response.json();
};

export const buscarCategorias = async () => {
    const response = await fetch(`${API_BASE}/categorias`);
    if (!response.ok) throw new Error("Erro ao buscar categorias.");
    return response.json();
};

export const criarTransacao = async (transacao) => {
    const response = await fetch(`${API_BASE}/transacoes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(transacao),
    });

    if (!response.ok) throw new Error("Erro ao criar transação.");
};

export const deletarTransacao = async (id) => {
    const response = await fetch(`${API_BASE}/transacoes/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) throw new Error("Erro ao excluir transação.");
};