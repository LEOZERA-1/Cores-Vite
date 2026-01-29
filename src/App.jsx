import { useEffect, useState } from "react";
import "./App.css";

function generateHexCode() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

function getTextColor(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const luminancia = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminancia > 186 ? "#000" : "#fff";
}

export default function App() {
  const [quadros, setQuadros] = useState([]);

  useEffect(() => {
    const iniciais = Array.from({ length: 5 }, () => ({
      cor: generateHexCode(),
      bloqueado: false,
    }));
    setQuadros(iniciais);

    function handleKeyDown(e) {
      if (e.code === "Space") {
        e.preventDefault();
        gerarCores();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function gerarCores() {
    setQuadros((estadoAtual) =>
      estadoAtual.map((quadro) =>
        quadro.bloqueado
          ? quadro
          : { ...quadro, cor: generateHexCode() }
      )
    );
  }

  function toggleBloqueio(index) {
    setQuadros((estadoAtual) =>
      estadoAtual.map((quadro, i) =>
        i === index
          ? { ...quadro, bloqueado: !quadro.bloqueado }
          : quadro
      )
    );
  }

  return (
    <div className="container">
      {quadros.map((quadro, index) => (
        <div
          key={index}
          className="quadro"
          style={{
            backgroundColor: quadro.cor,
            color: getTextColor(quadro.cor),
          }}
        >
          <span>{quadro.cor}</span>

          <button onClick={() => toggleBloqueio(index)}>
            {quadro.bloqueado ? "🔒" : "🔓"}
          </button>
        </div>
      ))}
    </div>
  );
}
