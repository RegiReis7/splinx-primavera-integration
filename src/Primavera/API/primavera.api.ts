import axios from "axios";
import dotenv from "dotenv";
import log from "../../Log";
import Primavera, {
  PrimaveraToken,
  PrimaveraCustomer,
} from "../Model/primavera.models";

dotenv.config();

//Requisição de um token de acesso à API do Primavera

async function getToken(): Promise<PrimaveraToken | undefined> {
  const data = {
    username: process.env.USERNAME_PRIMAVERA,
    password: process.env.PASSWORD_PRIMAVERA,
    //company: process.env.COMPANY_PRIMAVERA,
    instance: "Default",
    grant_type: "password",
    line: "executive",
  };

  let token: PrimaveraToken;

  try {
    log.info(
      "(API PRIMAVERA) Requisitando um token de acesso da WebAPI do Primavera"
    );
    token = await axios.post(`${process.env.API_URL_PRIMAVERA}token`, {
      data,
    });
    return token;
  } catch (e) {
    log.error(`Falha ao requisitar o token de acesso (Primavera) : ${e}`);
    return undefined;
  }
}

//Chamada do método POST para a criação de um documento (factura)

export async function createDocument(document: Primavera) {
  const token = await getToken();

  try {
    log.info(
      "(API PRIMAVERA) Chamando o método POST para a criação de um documento (factura)"
    );
    return await axios.post(
      `${process.env.API_URL_PRIMAVERA}Vendas/Docs/CreateDocument/`,
      {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
        document,
      }
    );
  } catch (e) {
    log.error(`(API PRIMAVERA) Erro na criação do documento (factura): ${e}`);
  }
}

//Chamada do método POST para a criação de um cliente no Primavera

export async function createCustomer(customer: PrimaveraCustomer) {
  const token = await getToken();

  try {
    log.info(
      "(API PRIMAVERA) Chamando o método POST para a criação de um cliente no primavera"
    );
    return await axios.post(
      `${process.env.API_URL_PRIMAVERA}Base/Clientes/Actualiza`,
      {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
        customer,
      }
    );
  } catch (e) {
    log.error(`(API PRIMAVERA) Erro na criação do cliente no primavera: ${e}`);
  }
}
