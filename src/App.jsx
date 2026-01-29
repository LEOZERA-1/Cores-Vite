import { useState, useEffect } from "react";
import "./App.css";

function gerarCorAleatoria() {
  const numero = Math.floor(Math.random() * 16777215);
  return "#" + numero.toString(16).padStart(6, "0");
}

function corDoTexto(cor) {
  const r = parseInt(cor.slice(1, 3), 16);
  const g = parseInt(cor.slice(3, 5), 16);
  const b = parseInt(cor.slice(5, 7), 16);

  const brilho = 0.299 * r + 0.587 * g + 0.114 * b;
  return brilho > 186 ? "#000" : "#fff";
}

export default function App() {

  const [quadros, setQuadros] = useState([]);

  useEffect(() => {
    const listaInicial = [];

    for (let i = 0; i < 5; i++) {
      listaInicial.push({
        cor: gerarCorAleatoria(),
        bloqueado: false
      });
    }

    setQuadros(listaInicial);
  }, []);

  useEffect(() => {

    function aoPressionarTecla(evento) {
      if (evento.code === "Space") {
        evento.preventDefault();

        setQuadros((quadrosAtuais) => {
          return quadrosAtuais.map((quadro) => {

            if (quadro.bloqueado) {
              return quadro;
            } else {
              return {
                cor: gerarCorAleatoria(),
                bloqueado: false
              };
            }

          });
        });
      }
    }

    document.addEventListener("keydown", aoPressionarTecla);

    return () => {
      document.removeEventListener("keydown", aoPressionarTecla);
    };

  }, []);

  function alternarBloqueio(indice) {
    setQuadros((quadrosAtuais) => {
      return quadrosAtuais.map((quadro, i) => {

        if (i === indice) {
          return {
            cor: quadro.cor,
            bloqueado: !quadro.bloqueado
          };
        } else {
          return quadro;
        }

      });
    });
  }

  return (
    <div className="container">

      {quadros.map((quadro, index) => (
        <div
          key={index}
          className="quadro"
          style={{
            backgroundColor: quadro.cor,
            color: corDoTexto(quadro.cor)
          }}
        >
          <span>{quadro.cor}</span>

          <button onClick={() => alternarBloqueio(index)}>
            {quadro.bloqueado ? "🔒" : "🔓"}
          </button>
        </div>
      ))}

    </div>
  );
}