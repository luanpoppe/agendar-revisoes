import { Fragment, useState } from "react";
import "./App.css";
import { Titulo } from "./components/Titulo.tsx";
import { Botao } from "./components/Botao.tsx";
import { Card } from "./components/Card.tsx";
import { Formulario } from "./components/Formulario.tsx";
import axios from "axios";

function App() {
  // inicializado quando carrega a página
  let [cards, setCards] = useState([]);

  function fazerGet() {
    axios.get("http://127.0.0.1:8000/revisoes-hoje/").then((resposta) => {
      // cards = resposta.data; -> não pode passar assim, tem que passar com setCards
      setCards(resposta.data);
      console.log(resposta, cards);
    });
  }

  return (
    <Fragment>
      <Titulo></Titulo>
      <Formulario></Formulario>
      <h3>Pegue as revisões do dia aqui:</h3>
      <Botao buttonId="fazer-get" clicarBotao={fazerGet} color={"primary"}>
        Clique aqui
      </Botao>
      {cards.map((item) => {
        return <Card key={item.id} revisao={item}></Card>;
      })}
    </Fragment>
  );
}

export default App;
