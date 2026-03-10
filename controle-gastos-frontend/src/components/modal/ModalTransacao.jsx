import { useEffect, useState } from "react";
import { buscarCategorias, criarTransacao } from "../../services/api";

function ModalTransacao({ fecharModal, atualizar }) {
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");
    const [tipo, setTipo] = useState("RECEITA");
    const [categoria, setCategoria] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [erro, setErro] = useState("");
    const [recorrente, setRecorrente] = useState(false);
    const [quantidadeMeses, setQuantidadeMeses] = useState(1);

    useEffect(() => {
        const carregarCategorias = async () => {
            try {
                const data = await buscarCategorias();
                setCategorias(data);
            } catch (error) {
                console.error(error);
                setErro("Erro ao carregar categorias.");
            }
        };

        carregarCategorias();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setErro("");

            const novaTransacao = {
                descricao,
                valor: parseFloat(valor),
                data,
                tipo,
                categoria,
                recorrente: tipo === "DESPESA" ? recorrente : false,
                quantidadeMeses: tipo === "DESPESA" && recorrente ? Number(quantidadeMeses) : 1,
            };

            console.log("ENVIANDO:", novaTransacao);

            await criarTransacao(novaTransacao);
            await atualizar();
            fecharModal();
        } catch (error) {
            console.error(error);
            setErro("Erro ao salvar transação.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-6">
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-pink-200 p-5 sm:p-8 shadow-2xl border border-white/10">
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-5">
                    Nova Transação
                </h2>

                {erro && (
                    <p className="text-red-600 text-sm sm:text-base mb-4">
                        {erro}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col text-black gap-3">
                    <div className="flex flex-col">
                        <label className="text-sm sm:text-base font-medium mb-1">
                            Categoria
                        </label>
                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className="p-3 rounded-xl bg-pink-300 text-black border-0 focus:outline-none text-sm sm:text-base min-h-[48px]"
                            required
                        >
                            <option value="">Selecione a categoria</option>
                            {categorias.map((cat, index) => (
                                <option key={index} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm sm:text-base font-medium mb-1">
                            Descrição
                        </label>
                        <input
                            type="text"
                            placeholder="Ex.: Mercado do mês"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="p-3 rounded-xl bg-pink-300 text-black border-0 focus:outline-none text-sm sm:text-base min-h-[48px]"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm sm:text-base font-medium mb-1">
                            Valor
                        </label>
                        <input
                            type="number"
                            placeholder="Ex.: 150.00"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            className="p-3 rounded-xl bg-pink-300 text-black border-0 focus:outline-none text-sm sm:text-base min-h-[48px]"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm sm:text-base font-medium mb-1">
                            Data
                        </label>
                        <input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="p-3 rounded-xl bg-pink-300 text-black border-0 focus:outline-none text-sm sm:text-base min-h-[48px]"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm sm:text-base font-medium mb-1">
                            Tipo
                        </label>
                        <select
                            value={tipo}
                            onChange={(e) => {
                                const novoTipo = e.target.value;
                                setTipo(novoTipo);

                                if (novoTipo !== "DESPESA") {
                                    setRecorrente(false);
                                    setQuantidadeMeses(1);
                                }
                            }}
                            className="p-3 rounded-xl bg-pink-300 text-black border-0 focus:outline-none text-sm sm:text-base min-h-[48px]"
                        >
                            <option value="RECEITA">Receita</option>
                            <option value="DESPESA">Despesa</option>
                            <option value="INVESTIMENTO">Investimento</option>
                        </select>
                    </div>

                    {tipo === "DESPESA" && (
                        <div className="flex flex-col gap-3 bg-pink-300 rounded-xl p-3">
                            <label className="flex items-center gap-2 text-sm sm:text-base">
                                <input
                                    type="checkbox"
                                    checked={recorrente}
                                    onChange={(e) => setRecorrente(e.target.checked)}
                                />
                                Este gasto se repete?
                            </label>

                            {recorrente && (
                                <div className="flex flex-col">
                                    <label className="text-sm sm:text-base font-medium mb-1">
                                        Repetir por quantos meses?
                                    </label>

                                    <select
                                        value={quantidadeMeses}
                                        onChange={(e) => setQuantidadeMeses(Number(e.target.value))}
                                        className="p-3 rounded-xl bg-pink-200 text-black border-0 focus:outline-none text-sm sm:text-base min-h-[48px]"
                                    >
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1} {i + 1 === 1 ? "mês" : "meses"}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 mt-3">
                        <button
                            type="submit"
                            className="w-full sm:w-auto flex-1 bg-green-600 px-4 py-3 rounded-xl text-black font-medium cursor-pointer hover:opacity-80"
                        >
                            Salvar
                        </button>

                        <button
                            type="button"
                            onClick={fecharModal}
                            className="w-full sm:w-auto flex-1 bg-red-500 px-4 py-3 rounded-xl text-black font-medium cursor-pointer hover:opacity-80"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalTransacao;