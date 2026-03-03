import CardSaldo from "./CardSaldo";
import CardReceitas from "./CardReceitas";
import CardDespesas from "./CardDespesas";
import CardInvestimentos from "./CardInvestimentos";
import { deletarTransacao } from "../../services/api";

function ResumoMensal({ resumo, transacoes }) {
    if (!resumo) return null;

    const partes = resumo.split(",");
    const receitasTotal = partes[0]?.split(":")[1]?.trim();
    const despesasTotal = partes[1]?.split(":")[1]?.trim();
    const investimentosTotal = partes[2]?.split(":")[1]?.trim();
    const saldo = partes[3]?.split(":")[1]?.trim();

    const excluir = async (id) => {
        await deletarTransacao(id);
        window.location.reload(); // simples por enquanto
    };

    const receitas = transacoes.filter(t => t.tipo === "RECEITA");
    const despesas = transacoes.filter(t => t.tipo === "DESPESA");
    const investimentos = transacoes.filter(t => t.tipo === "INVESTIMENTO");

    return (
        <div>
            <CardSaldo saldo={saldo} />

            <div className="flex flex-col sm:flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 justify-center px-4 sm:px-0">
                <CardReceitas total={receitasTotal} lista={receitas} onExcluir={excluir} />
                <CardDespesas total={despesasTotal} lista={despesas} onExcluir={excluir} />
            </div>
            <CardInvestimentos total={investimentosTotal} lista={investimentos} onExcluir={excluir} />
        </div>
    );
}

export default ResumoMensal;