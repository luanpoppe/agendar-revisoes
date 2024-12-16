import { useEffect, useState } from "react";
import "./App.css";
import { Titulo } from "./components/Titulo.tsx";
import { Botao } from "./components/Botao.tsx";
import { Card } from "./components/Card.tsx";
import { Formulario } from "./components/Formulario.tsx";
import axios from "axios";
import { apiUrl } from "./environments";

function App() {
  // inicializado quando carrega a página
  let [cardsRevisoes, setCardsRevisoes] = useState([]);
  let [cardsPequenasRevisoes, setCardsPequenasRevisoes] = useState([]);
  let [qtsCardsMostrar, setQtsCardsMostrar] = useState(1);

  useEffect(() => {
    carregarRevisoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function carregarRevisoes() {
    getRevisoes();
    getPequenasRevisoes();
  }

  function getRevisoes() {
    axios.get(`${apiUrl}/revisoes-hoje/`).then((resposta) => {
      // cardsRevisoes = resposta.data; -> não pode passar assim, tem que passar com setCardsRevisoes
      setCardsRevisoes(resposta.data);
      console.log(resposta, cardsRevisoes);
    });
  }

  function getPequenasRevisoes() {
    axios.get(`${apiUrl}/revisoes-pequenas-hoje/`).then((resposta) => {
      // cardsPequenasRevisoes = resposta.data; -> não pode passar assim, tem que passar com setCardsRevisoes
      setCardsPequenasRevisoes(resposta.data);
      console.log(resposta, cardsPequenasRevisoes);
    });
  }

  return (
    <>
      <Titulo></Titulo>
      <Formulario></Formulario>
      <h3>Pegue as revisões do dia aqui:</h3>
      <Botao
        buttonId="fazer-get"
        clicarBotao={carregarRevisoes}
        color={"primary"}
      >
        Clique aqui
      </Botao>
      <section>
        <div className="d-flex flex-column align-content-center flex-wrap">
          {cardsRevisoes.slice(0, qtsCardsMostrar).map((item) => {
            return <Card key={item.id} revisao={item}></Card>;
          })}
        </div>
      </section>

      <Botao
        color={"secondary"}
        clicarBotao={() => {
          setQtsCardsMostrar((qtsCardsMostrar += 2));
        }}
      >
        Carregar Mais
      </Botao>
    </>
  );
}

export default App;
