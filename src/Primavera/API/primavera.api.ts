import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import log from "../../Log";
import Primavera, {
  PrimaveraToken,
  PrimaveraCustomer,
} from "../Model/primavera.models";

dotenv.config();

//Requests an access token

async function getToken(): Promise<PrimaveraToken | undefined> {
  const data = {
    username: process.env.USERNAME_PRIMAVERA,
    password: process.env.PASSWORD_PRIMAVERA,
    company: process.env.COMPANY_PRIMAVERA,
    instance: "Default",
    grant_type: "password",
  };

  let token: PrimaveraToken;

  log.info("Requesting an acces token from primavera webAPI");
  try {
    token = await axios.post(`${process.env.API_URL_PRIMAVERA}token`, {
      data,
    });
    return token;
  } catch (e) {
    return undefined;
  }
}

//Calls POST method to create a document

export async function createDocument(document: Primavera) {
  const token = await getToken();

  log.info("Calling a post method to create a primavera document");
  try {
    await axios.post(
      `${process.env.API_URL_PRIMAVERA}Vendas/Docs/CreateDocument/`,
      {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
        document,
      }
    );
  } catch (e) {
    return e;
  }
}

//Calls POST method to create a customer

export async function createCustomer(customer: PrimaveraCustomer) {
  const token = await getToken();

  log.info("Calling a post method to create a primavera customer");
  try {
    await axios.post(
      `${process.env.API_URL_PRIMAVERA}Base/Clientes/Actualiza`,
      {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
        customer,
      }
    );
  } catch (e) {
    return e;
  }
}
