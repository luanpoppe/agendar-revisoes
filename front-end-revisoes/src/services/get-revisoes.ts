import axios from "axios";
import { apiUrl } from "../environments";

export async function getRevisoesAmanha() {
  const resposta = await axios.get(`${apiUrl}/revisoes-amanha/`);
  return resposta.data;
}
