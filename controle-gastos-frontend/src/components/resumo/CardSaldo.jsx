function CardSaldo({ saldo }) {
    return (
        <div className=" p-5 rounded-xl mb-5 text-center bg-blue-400 ml-80 mr-80">
            <h2 className="text-xl font-bold text-white mb-2">Disponível</h2>
            <p className="text-2xl font-bold text-white">R$ {saldo}</p>
        </div>
    );
}

export default CardSaldo;