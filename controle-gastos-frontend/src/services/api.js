const API_URL = "https://controle-de-gastos-xvl2.onrender.com/transacoes";

export const buscarTodas = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const buscarPorMes = async (mes, ano) => {
    const response = await fetch(
        `${API_URL}/mes?mes=${mes}&ano=${ano}`
    );
    return response.json();
};

export const buscarResumo = async (mes, ano) => {
    const response = await fetch(
        `${API_URL}/resumo?mes=${mes}&ano=${ano}`
    );
    return response.text();
};

export const criarTransacao = async (transacao) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(transacao),
    });

    return response.json();
};

export const deletarTransacao = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};