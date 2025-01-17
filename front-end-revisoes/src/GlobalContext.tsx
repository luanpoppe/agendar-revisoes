import { createContext, PropsWithChildren, useContext, useState } from "react";

type States = {
  cardsRevisoes: Revisao[];
  setCardsRevisoes: SetState<Revisao[]>;
  cardsRevisoesFiltrados: Revisao[];
  setCardsRevisoesFiltrados: SetState<Revisao[]>;
  qtsCardsMostrar: number;
  setQtsCardsMostrar: SetState<number>;
  isLoading: boolean;
  setIsLoading: SetState<boolean>;
  shouldShowNewCards: boolean;
  setShouldShowNewCards: SetState<boolean>;
};

const ContextComponent = createContext<States>(null);
export const useGlobalContext = () => useContext(ContextComponent);

export function GlobalContext({ children }: PropsWithChildren) {
  let [cardsRevisoes, setCardsRevisoes] = useState<Revisao[]>([]);
  let [cardsRevisoesFiltrados, setCardsRevisoesFiltrados] = useState<Revisao[]>(
    []
  );
  let [qtsCardsMostrar, setQtsCardsMostrar] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldShowNewCards, setShouldShowNewCards] = useState<boolean>(false);

  const contextObj = {
    cardsRevisoes,
    setCardsRevisoes,
    cardsRevisoesFiltrados,
    setCardsRevisoesFiltrados,
    qtsCardsMostrar,
    setQtsCardsMostrar,
    isLoading,
    setIsLoading,
    shouldShowNewCards,
    setShouldShowNewCards,
  };

  return (
    <ContextComponent.Provider value={contextObj}>
      {children}
    </ContextComponent.Provider>
  );
}
