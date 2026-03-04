import CardSaldo from "./CardSaldo";
import CardReceitas from "./CardReceitas";
import CardDespesas from "./CardDespesas";
import CardInvestimentos from "./CardInvestimentos";
import { deletarTransacao, buscarResumo } from "../../services/api";
import { useEffect, useMemo, useState } from "react";

function ResumoMensal({ mes, ano, transacoes = [] }) {
    const [resumo, setResumo] = useState({
        receitas: 0,
        despesas: 0,
        investimentos: 0,
        saldo: 0,
    });

    const excluir = async (id) => {
        await deletarTransacao(id);
        window.location.reload(); // simples por enquanto
    };

    const receitas = useMemo(
        () => transacoes.filter((t) => t.tipo === "RECEITA"),
        [transacoes]
    );
    const despesas = useMemo(
        () => transacoes.filter((t) => t.tipo === "DESPESA"),
        [transacoes]
    );
    const investimentos = useMemo(
        () => transacoes.filter((t) => t.tipo === "INVESTIMENTO"),
        [transacoes]
    );

    // totais (vindos do backend)
    useEffect(() => {
        (async () => {
            const data = await buscarResumo(mes, ano);

            setResumo({
                receitas: Number(data.receitas ?? 0),
                despesas: Number(data.despesas ?? 0),
                investimentos: Number(data.investimentos ?? 0),
                saldo: Number(data.saldo ?? 0),
            });
        })();
    }, [mes, ano]);

    return (
        <div>
            <div className="px-4 sm:px-0 max-w-[850px] mx-auto">
                <CardSaldo saldo={resumo.saldo} />
            </div>

            <div className="flex flex-col sm:flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 justify-center px-4 sm:px-0">
                <CardReceitas total={resumo.receitas} lista={receitas} onExcluir={excluir} />
                <CardDespesas total={resumo.despesas} lista={despesas} onExcluir={excluir} />
            </div>

            <div className="px-4 sm:px-0 max-w-[850px] mx-auto">
                <CardInvestimentos
                    total={resumo.investimentos}
                    lista={investimentos}
                    onExcluir={excluir}
                />
            </div>
        </div>
    );
}

export default ResumoMensal;