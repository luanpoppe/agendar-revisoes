import { apiUrl } from "../environments";
import axios from "axios";

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
    axios.patch(url, revisao).then((res) => {
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
