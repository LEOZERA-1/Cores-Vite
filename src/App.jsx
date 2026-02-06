import { useEffect, useState } from 'react';
import Quadro from './Quadro';
import './App.css';

function App() {

  function gerarHexCode() {
    const numero = Math.floor(Math.random() * 16777215);
    return "#" + numero.toString(16).padStart(6, "0");
  };

  const [desbloqueados, setDesbloqueados] = useState([true, true, true, true, true]);
  const [cores, setCores] = useState([
    gerarHexCode(),
    gerarHexCode(),
    gerarHexCode(),
    gerarHexCode(),
    gerarHexCode(),
  ]);

  function gerarCor() {
    setCores((coresAtuais) =>
      coresAtuais.map((cor, index) => {
        if (desbloqueados[index]) {
          return gerarHexCode();
        } else {
          return cor;
        }
      })
    );
  }

  function adicionarItem () {
    setDesbloqueados([...desbloqueados, true]);
    setCores([...cores, gerarHexCode()]);
  }

  function removerItem (numeroDoQuadro) {
    const removerQuadro = [...desbloqueados];
    removerQuadro.splice(numeroDoQuadro, 1);

    const removerCor = [...cores];
    removerCor.splice(numeroDoQuadro,1);

    setDesbloqueados(removerQuadro);
    setCores(removerCor);
  }

  function trocarTexto (numeroDaBarra) {
    const novoEstado = [...desbloqueados];
    novoEstado[numeroDaBarra] = !desbloqueados[numeroDaBarra];
    setDesbloqueados(novoEstado);
  };

  useEffect(() => {
    function aoPressionar(event) {
      if (event.code === "Space") {
        gerarCor();
      }
    }

    document.addEventListener("keydown", aoPressionar);
    return () => document.removeEventListener("keydown", aoPressionar);

  }, [desbloqueados]);

  return (
    <div>
      <div className="container">

        {cores.map((cor, index) => (
          <Quadro
            key={index}
            cor={cor}
            desbloqueado={desbloqueados[index]}
            onTrocar={() => trocarTexto(index)}
            onRemover={() => removerItem(index)}
          />
        ))}

        <div className="quadro">
          <button className="adicionar" onClick={adicionarItem}>+</button>
        </div>

      </div>
    </div>
  );
}

export default App;
