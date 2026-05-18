import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login"; // Vamos criar este arquivo
import "./App.css";

function App() {
  const [isAutenticado, setIsAutenticado] = useState(false);

  // Assim que o App carrega, verifica se o usuário já fez login antes
  useEffect(() => {
    const logado = localStorage.getItem("autenticado");
    if (logado === "true") {
      setIsAutenticado(true);
    }
  }, []);

  // Função que será chamada quando o login der certo
  const handleLoginSucesso = () => {
    setIsAutenticado(true);
  };

  // Função que será chamada quando o logout der certo
  const handleLogout = () => {
    // Limpa o localStorage
    localStorage.removeItem("autenticado");
    // Atualiza o estado
    setIsAutenticado(false);
  };

  // Renderização Condicional:
  // Se não estiver autenticado, renderiza a tela de Login
  if (!isAutenticado) {
    return <Login onLoginSucesso={handleLoginSucesso} />;
  }

  // Se estiver autenticado, renderiza o sistema (Home) e passa a função de logout
  return <Home onLogout={handleLogout} />;
}

export default App;