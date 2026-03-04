function formatarData(dataISO) {
    if (!dataISO) return "";
    if (dataISO instanceof Date) {
        const dia = String(dataISO.getDate()).padStart(2, "0");
        const mes = String(dataISO.getMonth() + 1).padStart(2, "0");
        return `${dia}/${mes}`;
    }

    if (typeof dataISO === "string" && dataISO.includes("T")) {
        dataISO = dataISO.split("T")[0];
    }
    if (typeof dataISO === "string" && dataISO.includes("-")) {
        const [ano, mes, dia] = dataISO.split("-");
        return `${dia}/${mes}`;
    }
    return String(dataISO); // fallback, caso formato seja inesperado
}

function CardInvestimentos({ total, lista, onExcluir }) {
    const itens = Array.isArray(lista) ? lista : [];

    return (
        <div className="bg-despesa p-4 sm:p-5 rounded-xl mb-4 sm:mb-5 text-center bg-violet-400 mx-4 sm:mx-auto max-w-full sm:max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-2 sm:mb-3">Investimentos</h3>
            <p className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">R$ {total}</p>

            <div className="mt-2 sm:mt-3">
                {itens.length === 0 && <p className="text-gray-400 text-sm sm:text-base">Nenhum investimento</p>}

                {itens.map((t) => (
                    <div key={t.id} className="grid grid-cols-[50px_1fr_80px_25px] sm:grid-cols-4 gap-1 sm:gap-2 text-xs sm:text-sm md:text-base py-1 px-2 items-center border-b border-white border-opacity-10">
                        <span className="text-black text-xs sm:text-sm">{formatarData(t.data)}</span>

                        <span className="text-black text-xs sm:text-sm truncate">
                            {t.categoria}
                        </span>

                        <span className="text-right text-black font-bold text-xs sm:text-sm">
                            R$ {t.valor}
                        </span>

                        <button
                            className="bg-transparent border-0 cursor-pointer text-xs sm:text-sm hover:text-red-600"
                            onClick={() => onExcluir(t.id)}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardInvestimentos;