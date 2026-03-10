import { useState } from "react";
import { formatarData } from "../../utilis/formatarData";
import { formatarMoeda } from "../../utilis/formatarMoeda";

function CardInvestimentos({ total, lista = [], onExcluir }) {
    const [descricaoAbertaId, setDescricaoAbertaId] = useState(null);

    const toggleDescricao = (id) => {
        setDescricaoAbertaId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="bg-violet-400 p-4 sm:p-5 rounded-xl mb-4 sm:mb-5 text-center mx-4 sm:mx-0 md:min-w-[390px]">
            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-2 sm:mb-3">
                Investimentos
            </h3>

            <p className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                {formatarMoeda(total)}
            </p>

            <div className="mt-2 sm:mt-3">
                {lista.length === 0 && (
                    <p className="text-gray-900 text-sm sm:text-base">
                        Nenhuma saída
                    </p>
                )}

                {lista.map((t) => (
                    <div
                        key={t.id}
                        className="border-b border-black border-opacity-10"
                    >
                        <div className="grid grid-cols-[60px_1fr_32px_90px_25px] sm:grid-cols-[70px_1fr_24px_120px_30px] gap-2 items-center py-1 px-2">
                            <span className="text-black text-xs sm:text-sm">
                                {formatarData(t.data)}
                            </span>

                            <span className="text-black text-xs sm:text-sm truncate">
                                {t.categoria}
                            </span>

                            <button
                                type="button"
                                title={t.descricao || "Sem descrição"}
                                onClick={() => toggleDescricao(t.id)}
                                className="w-8 h-8 sm:w-5 sm:h-5 flex items-center justify-center justify-self-center cursor-pointer"
                            >
                                <span className="w-2.5 h-2.5 rounded-full bg-black opacity-50 hover:opacity-100" />
                            </button>

                            <span className="text-right text-black font-bold text-xs sm:text-sm">
                                {formatarMoeda(t.valor)}
                            </span>

                            <button
                                className="bg-transparent border-0 cursor-pointer sm:text-lg hover:text-red-700"
                                onClick={() => onExcluir(t.id)}
                            >
                                ✕
                            </button>
                        </div>

                        {descricaoAbertaId === t.id && (
                            <div className="block sm:hidden text-left px-2 pb-2">
                                <div className="bg-violet-300 rounded-lg px-3 py-2 text-xs text-black">
                                    {t.descricao || "Sem descrição"}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardInvestimentos;