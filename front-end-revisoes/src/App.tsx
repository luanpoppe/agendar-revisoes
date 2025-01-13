import { useEffect, useState } from "react";
import "./App.css";
import { Titulo } from "./components/Titulo";
import { Botao } from "./components/Botao";
import { Card } from "./components/Card";
import { Formulario } from "./components/Formulario";
import axios from "axios";
import { apiUrl } from "./environments";
import { Loading } from "./components/Loading";

function App() {
  // inicializado quando carrega a página
  let [cardsRevisoes, setCardsRevisoes] = useState([]);
  let [qtsCardsMostrar, setQtsCardsMostrar] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getRevisoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getRevisoes() {
    setIsLoading(true);
    axios.get(`${apiUrl}/revisoes-hoje/`).then((resposta) => {
      // cardsRevisoes = resposta.data; -> não pode passar assim, tem que passar com setCardsRevisoes
      setCardsRevisoes(resposta.data);
      setIsLoading(false);
      console.log(resposta, cardsRevisoes);
    });
  }

  return (
    <>
      <Titulo></Titulo>
      <Formulario
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      ></Formulario>
      <h3>Pegue as revisões do dia aqui:</h3>
      <Botao buttonId="fazer-get" clicarBotao={getRevisoes} color={"primary"}>
        Clique aqui
      </Botao>
      <section>
        <div className="d-flex flex-column align-content-center flex-wrap">
          {cardsRevisoes.slice(0, qtsCardsMostrar).map((item) => {
            if (isLoading) return <Loading />;
            else
              return (
                <Card
                  key={item.id}
                  revisao={item}
                  setIsLoading={setIsLoading}
                ></Card>
              );
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
