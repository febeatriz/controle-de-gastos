import { useEffect, useState } from "react";
import { buscarResumo, buscarPorMes } from "../services/api";
import Header from "../components/layout/Header";
import ResumoMensal from "../components/resumo/ResumoMensal";
import FloatingButton from "../components/layout/FloatingButton";
import ModalTransacao from "../components/modal/ModalTransacao";

function Home() {
    const hoje = new Date();

    const [mes, setMes] = useState(hoje.getMonth() + 1);
    const [ano, setAno] = useState(hoje.getFullYear());
    const [resumo, setResumo] = useState("");
    const [transacoesMes, setTransacoesMes] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);

    const carregarResumo = async () => {
        const resumoData = await buscarResumo(mes, ano);
        const lista = await buscarPorMes(mes, ano);

        setResumo(resumoData);
        setTransacoesMes(lista);
    };

    useEffect(() => {
        carregarResumo();
    }, [mes, ano]);

    return (
        <div className="p-5">
            <Header mes={mes} ano={ano} setMes={setMes} setAno={setAno} />
            <ResumoMensal resumo={resumo} transacoes={transacoesMes} />

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