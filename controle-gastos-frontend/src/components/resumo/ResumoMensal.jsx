import { deletarTransacao } from "../../services/api";
import CardSaldo from "../cards/CardSaldo";
import CardReceitas from "../cards/CardReceitas";
import CardDespesas from "../cards/CardDespesas";
import CardInvestimentos from "../cards/CardInvestimentos";

function ResumoMensal({ resumo, transacoes = [], onAtualizar }) {
    const receitas = transacoes.filter((t) => t.tipo === "RECEITA");
    const despesas = transacoes.filter((t) => t.tipo === "DESPESA");
    const investimentos = transacoes.filter((t) => t.tipo === "INVESTIMENTO");

    const excluir = async (id) => {
        const confirmar = window.confirm("Deseja realmente excluir esta transação?");
        if (!confirmar) return;

        await deletarTransacao(id);
        onAtualizar();
    };

    return (
        <div>
            <div className="px-4 sm:px-0 max-w-[850px] mx-auto">
                <CardSaldo saldo={resumo.saldo} />
            </div>

            <div className="flex flex-col sm:flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 justify-center px-4 sm:px-0">
                <CardReceitas
                    total={resumo.receitas}
                    lista={receitas}
                    onExcluir={excluir}
                />

                <CardDespesas
                    total={resumo.despesas}
                    lista={despesas}
                    onExcluir={excluir}
                />
            </div>

            <div className="px-4 sm:px-0 max-w-[440px] mx-auto">
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