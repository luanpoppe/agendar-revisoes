import { Fragment, useState } from "react";
import "./App.css";
import { Titulo } from "./components/Titulo.tsx";
import { Botao } from "./components/Botao.tsx";
import { Card } from "./components/Card.tsx";
import { Formulario } from "./components/Formulario.tsx";
import axios from "axios";

function App() {
  // inicializado quando carrega a página
  let [cardsRevisoes, setCardsRevisoes] = useState([]);
  let [cardsPequenasRevisoes, setCardsPequenasRevisoes] = useState([]);

  function carregarRevisoes() {
    getRevisoes()
    getPequenasRevisoes()
  }

  function getRevisoes() {
    axios.get("http://127.0.0.1:8000/revisoes-hoje/").then((resposta) => {
      // cardsRevisoes = resposta.data; -> não pode passar assim, tem que passar com setCardsRevisoes
      setCardsRevisoes(resposta.data);
      console.log(resposta, cardsRevisoes);
    });
  }

  function getPequenasRevisoes() {
    axios.get("http://127.0.0.1:8000/revisoes-pequenas-hoje/").then((resposta) => {
      // cardsPequenasRevisoes = resposta.data; -> não pode passar assim, tem que passar com setCardsRevisoes
      setCardsPequenasRevisoes(resposta.data);
      console.log(resposta, cardsPequenasRevisoes);
    });
  }

  return (
    <Fragment>
      <Titulo></Titulo>
      <Formulario></Formulario>
      <h3>Pegue as revisões do dia aqui:</h3>
      <Botao buttonId="fazer-get" clicarBotao={carregarRevisoes} color={"primary"}>
        Clique aqui
      </Botao>
      <section className="d-flex justify-content-between">
        <div>
          {cardsRevisoes.map((item) => {
            return <Card key={item.id} revisao={item}></Card>;
          })}
        </div>
        <div>
          {cardsPequenasRevisoes.map((item) => {
            return <Card key={item.id} revisao={item}></Card>;
          })}
        </div>
      </section>
    </Fragment>
  );
}

export default App;
