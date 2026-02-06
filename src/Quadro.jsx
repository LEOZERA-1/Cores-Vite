function Quadro({ cor, desbloqueado, onTrocar, onRemover }) {
  return (
    <div className="quadro" style={{ backgroundColor: cor }}>
      {cor}

      <button
        className="botao"
        onClick={onTrocar}
        id="botaoCadeado"
      >
        {desbloqueado ? "🔓" : "🔒"}
      </button>

      <button
        className="botao"
        onClick={onRemover}
      >
        X
      </button>
    </div>
  );
}

export default Quadro;
