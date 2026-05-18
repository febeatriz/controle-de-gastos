import { logout } from "../../services/api";

function Header({ mes, ano, setMes, setAno, onLogout }) {
    const handleLogout = async () => {
        try {
            await logout();
            onLogout();
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            // Mesmo com erro na API, faz o logout local
            onLogout();
        }
    };

    return (
        <>
            {/* Botão de Logout - Canto direito */}
            <button
                onClick={handleLogout}
                title="Sair"
                className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 sm:p-3 transition-colors z-40 flex items-center justify-center"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-6 sm:h-6"
                >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
            </button>

            <div className="grid justify-center items-center mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold font-serif text-white text-center">
                    Resumo do Mês
                </h1>
                <div className="flex gap-2 justify-center mt-3 sm:mt-4 border border-white rounded-lg p-1">
                    <select value={mes} onChange={(e) => setMes(Number(e.target.value))}
                        className="px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-dark-card text-white text-sm sm:text-base md:text-lg lg:text-xl border-0 focus:outline-none">
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
        </>
    );
}

export default Header;