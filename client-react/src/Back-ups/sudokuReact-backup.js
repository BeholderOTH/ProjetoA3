import React, { useState, useRef } from "react";
import '../App.css';

const Sudoku = ({ atualizarVitorias }) => {
  const [numEscolhido, setNumEscolhido] = useState(null);
  const [pedacoEscolhido, setPedacoEscolhido] = useState(null);
  const [erros, setErros] = useState(0);
  const [gradeInicial, setGradeInicial] = useState([
    "--6-----1",
    "-7--6--5-",
    "8--1-32--",
    "--5-4-8--",
    "-4-7-2-9-",
    "--8-1-7--",
    "--12-5--3",
    "-6--7--8-",
    "------4--"
  ]);
  const [grade, setGrade] = useState([...gradeInicial]);

  const solucaoGrade = [
    "536827941",
    "172964358",
    "894153267",
    "715349826",
    "643782195",
    "928516734",
    "481295673",
    "369471582",
    "257638419"
  ];

  const pedacosRef = useRef([]);

  const prepararTabuleiro = () => {
    const tabuleiro = [];
    for (let i = 0; i < 9; i++) {
      const linha = [];
      for (let j = 0; j < 9; j++) {
        const pedacoId = `${i}-${j}`;
        let pedacoValue = grade[i][j];
        let pedacoClass = "pedacos";
        if (pedacoValue !== "-") {
          pedacoClass += " pedacos-sec";
        }
        if (i === 2 || i === 5) {
          pedacoClass += " linhaH";
        }
        if (j === 2 || j === 5) {
          pedacoClass += " linhaY";
        }
        linha.push(
          <div
            key={pedacoId}
            id={pedacoId}
            className={pedacoClass}
            onClick={selecionarPedaco}
            ref={(ref) => (pedacosRef.current[pedacoId] = ref)}
          >
            {pedacoValue !== "-" ? pedacoValue : ""}
          </div>
        );
      }
      tabuleiro.push(
        <div key={i} className="linha">
          {linha}
        </div>
      );
    }
    return tabuleiro;
  };

  const selecionarPedaco = (event) => {
    if (numEscolhido) {
      const pedaco = event.target;
      if (pedaco.innerText !== "") {
        return;
      }

      const cord = pedaco.id.split("-");
      const i = parseInt(cord[0]);
      const j = parseInt(cord[1]);

      if (solucaoGrade[i][j] === numEscolhido.id) {
        pedaco.innerText = numEscolhido.id;
        const newGrade = [...grade];
        newGrade[i] = newGrade[i].substring(0, j) + numEscolhido.id + newGrade[i].substring(j + 1);
        setGrade(newGrade);
      } else {
        setErros(erros + 1);
      }

      if (erros >= 3) {
        reiniciarJogo();
      }
    }
  };

  const reiniciarJogo = () => {
    setNumEscolhido(null);
    setPedacoEscolhido(null);
    setErros(0);
    setGrade([...gradeInicial]);

    for (let i = 0; i < pedacosRef.current.length; i++) {
      const pedaco = pedacosRef.current[i];
      const cord = pedaco.id.split("-");
      const linha = parseInt(cord[0]);
      const coluna = parseInt(cord[1]);
      if (grade.join(" ") === solucaoGrade.join(" ")) {
        atualizarVitorias();  
      }
      if (gradeInicial[linha][coluna] !== "-") {
        pedaco.innerText = gradeInicial[linha][coluna];
      } else {
        pedaco.innerText = "";
      }
    }
  };

  const selecionarNum = (event) => {
    if (numEscolhido !== null) {
      numEscolhido.classList.remove("numero-sec");
    }
    setNumEscolhido(event.target);
    event.target.classList.add("numero-sec");
  };

  return (
    <div>
      <div id="erros">{erros}</div>
      <p>Número de vitórias: { atualizarVitorias }</p>
      <h2>Serão permitidos somente 3 erros</h2>
      <div id="grade">{prepararTabuleiro()}</div>
      <div id="digitos">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div
            key={num}
            id={num}
            className="numero"
            onClick={selecionarNum}
          >
            {num}
          </div>
        ))}
      </div>
      <button onClick={reiniciarJogo}>Reiniciar</button>
    </div>
  );
};

export default Sudoku;