import toast from "react-hot-toast";
import { apiUrl } from "../environments";
import axios from "axios";
import { differenceInDays } from "date-fns";

export function getRevisoes(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCardsRevisoes: React.Dispatch<React.SetStateAction<any[]>>,
  funcaoFilterCards: Function
) {
  setIsLoading(true);
  return axios.get(`${apiUrl}/revisoes-hoje/`).then((resposta) => {
    // cardsRevisoes = resposta.data; -> não pode passar assim, tem que passar com setCardsRevisoes
    setCardsRevisoes(resposta.data);
    setIsLoading(false);
    funcaoFilterCards(resposta.data);
  });
}

export function revisarCard(
  revisao: Revisao,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const input = document.getElementById(
    `input-${revisao.id}`
  ) as HTMLInputElement;
  console.log("input: ", input);
  if (input.value) {
    setIsLoading(true);
    revisao.intervalo_revisao = parseInt(input.value);
    revisao.proxima_data = undefined;
    console.log("revisao: ", revisao);

    const url = `${apiUrl}/revisao/${revisao.id}`;
    axios.patch(url, revisao).then(async (res) => {
      const assuntoRevisao = await axios.get(url);
      console.log("assuntoRevisao.data: ", assuntoRevisao.data);
      const intervaloDeVerdade = differenceInDays(
        assuntoRevisao.data.proxima_data,
        assuntoRevisao.data.ultima_data
      );
      toast.success(`Intervalo de verdade adicionado: ${intervaloDeVerdade}`, {
        duration: 10000,
      });
      const botaoFazerGet = document.getElementById("fazer-get");
      botaoFazerGet.click();
      setIsLoading(false);
    });
  }
}

export function inativarCard(
  revisao: Revisao,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsLoading(true);
  const url = `${apiUrl}/revisao/${revisao.id}`;

  const body = {
    ...revisao,
    ativo: false,
  };
  axios.patch(url, body).then((res) => {
    const botaoFazerGet = document.getElementById("fazer-get");
    botaoFazerGet.click();
    setIsLoading(false);
  });
}
