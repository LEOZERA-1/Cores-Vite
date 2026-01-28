import './App.css'

function App() {
  function generateHexCode() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
}
  function getTextColor(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const luminancia = (0.299 * r + 0.587 * g + 0.114 * b);
    return luminancia > 186 ? "#000" : "#fff";
} 
  function gerarCores() {
    quadros.forEach((quadro) => {
        const cor = generateHexCode();

        quadro.style.backgroundColor = cor;
        quadro.style.color = getTextColor(cor);
        quadro.textContent = cor;
    });
}
const quadros = document.querySelectorAll(".quadro");
gerarCores();
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        gerarCores();
    }
});
  return (
    <>
      <div class="container">
        <div class="quadro">Cor 1</div>
        <div class="quadro">Cor 2</div>
        <div class="quadro">Cor 3</div>
        <div class="quadro">Cor 4</div>
        <div class="quadro">Cor 5</div>
    </div>
    </>
  )
}

export default App