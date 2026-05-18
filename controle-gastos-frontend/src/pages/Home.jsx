import { useEffect, useState } from "react";
import { buscarResumo, buscarPorMes } from "../services/api";
import Header from "../components/layout/Header";
import ResumoMensal from "../components/resumo/ResumoMensal";
import FloatingButton from "../components/layout/FloatingButton";
import ModalTransacao from "../components/modal/ModalTransacao";

function Home({ onLogout }) {
    const hoje = new Date();

    const [mes, setMes] = useState(hoje.getMonth() + 1);
    const [ano, setAno] = useState(hoje.getFullYear());

    const [resumo, setResumo] = useState({
        receitas: 0,
        despesas: 0,
        investimentos: 0,
        saldo: 0,
    });

    const [transacoesMes, setTransacoesMes] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    const carregarResumo = async () => {
        try {
            setLoading(true);
            setErro("");

            const [resumoData, lista] = await Promise.all([
                buscarResumo(mes, ano),
                buscarPorMes(mes, ano),
            ]);

            setResumo({
                receitas: Number(resumoData.receitas ?? 0),
                despesas: Number(resumoData.despesas ?? 0),
                investimentos: Number(resumoData.investimentos ?? 0),
                saldo: Number(resumoData.saldo ?? 0),
            });

            setTransacoesMes(Array.isArray(lista) ? lista : []);
        } catch (error) {
            console.error(error);
            setErro("Erro ao carregar os dados.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarResumo();
    }, [mes, ano]);

    return (
        <div className="p-3 sm:p-5 min-h-screen bg-slate-900">
            <Header
                mes={mes}
                ano={ano}
                setMes={setMes}
                setAno={setAno}
                onLogout={onLogout}
            />

            {loading && (
                <p className="text-center text-white text-lg mt-8">Carregando dados...</p>
            )}

            {erro && (
                <p className="text-center text-red-400 text-lg mt-8">{erro}</p>
            )}

            {!loading && !erro && (
                <ResumoMensal
                    mes={mes}
                    ano={ano}
                    resumo={resumo}
                    transacoes={transacoesMes}
                    onAtualizar={carregarResumo}
                />
            )}

            <FloatingButton abrirModal={() => setModalAberto(true)} />

            {modalAberto && (
                <ModalTransacao
                    fecharModal={() => setModalAberto(false)}
                    atualizar={carregarResumo}
                />
            )}
        </div>
    );
}

export default Home;