import { useState, useEffect } from "react";
import { criarTransacao } from "../../services/api";

function ModalTransacao({ fecharModal, atualizar }) {
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");
    const [tipo, setTipo] = useState("RECEITA");
    const [categoria, setCategoria] = useState("");
    const [categorias, setCategorias] = useState([]);

    // 🔹 Buscar categorias do backend
    useEffect(() => {
        fetch("http://localhost:8080/transacoes/categorias")
            .then((res) => res.json())
            .then((data) => setCategorias(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novaTransacao = {
            descricao,
            valor: parseFloat(valor),
            data,
            tipo,
            categoria,
        };

        await criarTransacao(novaTransacao);
        atualizar();
        fecharModal();
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-pink-200 p-8 rounded-2xl w-[400px] shadow-2xl border border-white/10">
                <h2 className="text-xl font-bold text-black mb-4">Nova Transação</h2>

                <form onSubmit={handleSubmit} className="flex flex-col text-black">
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="mb-3 p-2 rounded-lg bg-dark-input text-black border-0 focus:outline-none"
                        required
                    >
                        <option value="">Selecione a categoria</option>
                        {categorias.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="mb-3 p-2 rounded-lg bg-dark-input border-0 focus:outline-none"
                    />

                    <input
                        type="number"
                        placeholder="Valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className="mb-3 p-2 rounded-lg bg-dark-input text-black border-0 focus:outline-none"
                        required
                    />

                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="mb-3 p-2 rounded-lg bg-dark-input text-black focus:outline-none"
                        required
                    />

                    <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="mb-3 p-2 rounded-lg bg-dark-input text-black border-0 focus:outline-none">
                        <option value="RECEITA">Receita</option>
                        <option value="DESPESA">Despesa</option>
                        <option value="INVESTIMENTO">Investimento</option>
                    </select>


                    <div className="flex justify-between mt-2">
                        <button type="button" onClick={fecharModal} className="bg-red-500 border-0 px-3.5 py-2 rounded-lg text-black cursor-pointer hover:opacity-80">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-green-600 border-0 px-3.5 py-2 rounded-lg text-black cursor-pointer hover:opacity-80">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalTransacao;