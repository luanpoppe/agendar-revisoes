import { useEffect, useState } from "react";
import "./App.css";
import { Titulo } from "./components/Titulo";
import { Botao } from "./components/Botao";
import { Card } from "./components/Card";
import { Formulario } from "./components/Formulario";
import { Loading } from "./components/Loading";
import { getRevisoes } from "./utils/revisarCard";
import { useGlobalContext } from "./GlobalContext";
import { getRevisoesAmanha } from "./services/get-revisoes";
import { addDays, format, isTomorrow } from "date-fns";

function App() {
  // inicializado quando carrega a página

  let {
    cardsRevisoes,
    cardsRevisoesFiltrados,
    isLoading,
    qtsCardsMostrar,
    setCardsRevisoes,
    setCardsRevisoesFiltrados,
    setIsLoading,
    setQtsCardsMostrar,
    setShouldShowNewCards,
    shouldShowNewCards,
  } = useGlobalContext();
  const [revisoesAmanha, setRevisoesAmanha] = useState(999);

  function filterCards(shouldShowNewCards: boolean, cardsRevisoes: Revisao[]) {
    if (shouldShowNewCards) {
      setCardsRevisoesFiltrados(
        cardsRevisoes.filter((c) => c.intervalo_revisao == 0)
      );
    } else {
      setCardsRevisoesFiltrados(
        cardsRevisoes.filter((c) => c.intervalo_revisao != 0)
      );
    }
    setShouldShowNewCards(!shouldShowNewCards);
    setQtsCardsMostrar(1);
  }

  async function handleGetRevisao(
    shouldShowNewCardsParam = shouldShowNewCards
  ) {
    getRevisoes(setIsLoading, setCardsRevisoes, (cardsRevisoes: Revisao[]) =>
      filterCards(shouldShowNewCardsParam, cardsRevisoes)
    );

    const hoje = new Date();
    const amanha = hoje.getHours() > 4 ? addDays(hoje, 1) : addDays(hoje, 0);
    const amanhaFormatado = format(amanha, "yyyy-MM-dd");
    const revisoesAmanha = await getRevisoesAmanha();
    setRevisoesAmanha(
      revisoesAmanha.filter((r) => r.proxima_data == amanhaFormatado).length
    );
  }

  useEffect(() => {
    handleGetRevisao();
  }, []);

  return (
    <>
      <Titulo></Titulo>
      <Formulario handleGetRevisao={handleGetRevisao} />
      <h3>Pegue as revisões do dia aqui:</h3>
      <Botao
        buttonId="fazer-get"
        clicarBotao={() => handleGetRevisao(!shouldShowNewCards)}
        color={"primary"}
      >
        Clique aqui
      </Botao>
      <div className="mt-2">
        <Botao
          clicarBotao={() => filterCards(shouldShowNewCards, cardsRevisoes)}
          color="success"
        >
          {shouldShowNewCards ? "Ver novos cards" : "Ver cards pra revisar"}
        </Botao>
        <p className="mb-2 mt-2">Revisões para amanhã: {revisoesAmanha}</p>
      </div>
      <section>
        <div className="d-flex flex-column align-content-center flex-wrap">
          {cardsRevisoesFiltrados.slice(0, qtsCardsMostrar).map((item) => {
            if (isLoading) return <Loading key={item.id} />;
            else return <Card key={item.id} revisao={item}></Card>;
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
