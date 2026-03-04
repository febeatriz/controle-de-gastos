function CardSaldo({ saldo }) {
    const valor = Number(saldo ?? 0);

    return (
        <div className="p-4 sm:p-5 rounded-xl mb-5 text-center bg-violet-600 mx-4 sm:mx-12 md:mx-20 lg:ml-80 lg:mr-80">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Disponível</h2>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">R$ {valor}</p>
        </div>
    );
}

export default CardSaldo;