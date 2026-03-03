function FloatingButton({ abrirModal }) {
    return (
        <button className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-blue-500 text-white text-2xl sm:text-3xl shadow-lg hover:bg-blue-600 transition" onClick={abrirModal}>
            +
        </button>
    );
}

export default FloatingButton;