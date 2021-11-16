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
    //company: process.env.COMPANY_PRIMAVERA,
    instance: "Default",
    grant_type: "password",
    line : "executive"
  };

  let token: PrimaveraToken;

  try {
    log.info("Requesting an acces token from primavera webAPI");
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

  try {
    log.info("Calling a post method to create a primavera document");
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
    throw e;
  }
}

//Calls POST method to create a customer

export async function createCustomer(customer: PrimaveraCustomer) {
  const token = await getToken();

  try {
    log.info("Calling a post method to create a primavera customer");
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
    throw e;
  }
}
