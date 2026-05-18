import { useState } from "react";

function Login({ onLoginSucesso }) {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Login fake apenas para testar o front!
        if (usuario === "admin" && senha === "senha123") {
            // Salva no navegador que o usuário está logado
            localStorage.setItem("autenticado", "true");
            onLoginSucesso();
        } else {
            setErro("Usuário ou senha incorretos");
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl text-white font-bold mb-6 text-center">Entrar</h2>
                
                {erro && <p className="text-red-400 text-sm mb-4 text-center">{erro}</p>}

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Usuário"
                        className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </div>
                
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Senha"
                        className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
                >
                    Acessar
                </button>
            </form>
        </div>
    );
}

export default Login;