function formatarData(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}`;
}

function CardDespesas({ total, lista, onExcluir }) {
    return (
        <div className="bg-despesa p-5 rounded-xl mb-5 text-center bg-red-700">
            <h3 className="text-3xl font-bold text-white mb-3">Saídas</h3>
            <p className="text-xl font-bold text-white mb-6">R$ {total}</p>

            <div className="mt-3">
                {lista.length === 0 && <p className="text-gray-400">Nenhuma saída</p>}

                {lista.map((t) => (
                    <div key={t.id} className="grid grid-cols-[70px_1fr_120px_30px] gap-2 text-md py-1 px-2 items-center border-b border-white border-opacity-10">
                        <span className="text-white">{formatarData(t.data)}</span>

                        <span className="text-white">
                            {t.categoria}
                        </span>

                        <span className="text-right text-white font-bold">
                            R$ {t.valor}
                        </span>

                        <button
                            className="bg-transparent border-0 cursor-pointer hover:text-red-300"
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

export default CardDespesas;