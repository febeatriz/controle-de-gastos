function Header({ mes, ano, setMes, setAno }) {
    return (
        <div className="grid justify-center items-center mb-8 sm:mb-10 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white">Resumo do Mês</h1>

            <div className="flex gap-2 justify-center mt-3 sm:mt-4 border border-white rounded-lg p-1">
                <select value={mes} onChange={(e) => setMes(Number(e.target.value))} className="px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-dark-card text-white text-sm sm:text-base md:text-lg lg:text-xl border-0 focus:outline-none">
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1} className="bg-gray-900 text-white">
                            {String(i + 1).padStart(2, "0")}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    value={ano}
                    onChange={(e) => setAno(Number(e.target.value))}
                    className="px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-dark-card text-white text-sm sm:text-base md:text-lg lg:text-xl border-0 focus:outline-none w-16 sm:w-24"
                />
            </div>
        </div>
    );
}

export default Header;