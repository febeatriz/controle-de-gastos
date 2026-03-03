function FloatingButton({ abrirModal }) {
    return (
        <button className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-blue-500 text-white text-3xl shadow-lg hover:bg-blue-600 transition" onClick={abrirModal}>
            +
        </button>
    );
}

export default FloatingButton;