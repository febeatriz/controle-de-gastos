function formatarData(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}`;
}

function CardInvestimentos({ total, lista, onExcluir }) {
    return (
        <div className="bg-despesa p-5 rounded-xl mb-5 text-center bg-violet-400 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-black mb-3">Investimentos</h3>
            <p className="text-xl font-bold text-black mb-6">R$ {total}</p>

            <div className="mt-3">
                {lista.length === 0 && <p className="text-gray-400">Nenhum investimento</p>}

                {lista.map((t) => (
                    <div key={t.id} className="grid grid-cols-4 gap-2 text-md py-1 px-2 items-center border-b border-white border-opacity-10">
                        <span className="text-black">{formatarData(t.data)}</span>

                        <span className="text-black">
                            {t.categoria}
                        </span>

                        <span className="text-right text-black font-bold">
                            R$ {t.valor}
                        </span>

                        <button
                            className="bg-transparent border-0 cursor-pointer hover:text-red-600"
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