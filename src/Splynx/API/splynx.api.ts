import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";
import http_build_query from "http-build-query";
import InvoiceSplinx from "../Model/invoice.models";
import log from "../../Log";
import SplynxCustomer, {SplynxCustomerStatistics} from "../Model/customer.models";

dotenv.config();

var nonce_v = new Date().getTime();

//Autenticação básica para obter acesso à API do Splynx (usar caso a autenticação por assinatura falhar)

const token = Buffer.from(
  `${process.env.API_KEY}:${process.env.API_SECRET}`,
  "utf8"
).toString("base64");

//Autenticação de acesso à API do Splynx por assinatura

function signature() {
  log.info("(API) Criando a chave de assinatura...");
  var signature = nonce_v + process.env.API_KEY!!;

  return crypto
    .createHmac("sha256", Buffer.from(process.env.API_SECRET!!, "utf-8"))
    .update(Buffer.from(signature, "utf-8"))
    .digest("hex")
    .toUpperCase();
}

function getAuthString() {
  let params = {};

  params = {
    key: process.env.API_KEY,
    signature: signature(),
    nonce: nonce_v++,
  };

  return http_build_query(params);
}

//Chamada ao método GET para obter todos invoices

export async function getInvoices(): Promise<InvoiceSplinx[] | undefined> {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/2.0/admin/finance/invoices`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );
    log.info("(API) Retornando a lista de invoices...");
    return await response.data;
  } catch (e) {
    log.error(`(API) Falha ao requisitar a lista de invoices: ${e}`);
    return undefined;
  }
}

//Chamada ao método GET para obter um invoice dado o id

export async function getInvoiceById(
  id: number
): Promise<InvoiceSplinx | undefined> {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/2.0/admin/finance/invoices/${id}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );
    log.info(`(API) Retornando o invoice ${id}...`);
    return await response.data;
  } catch (e) {
    log.error(`(API) Falha ao requisitar o invoice ${id} : ${e}`);
    return undefined;
  }
}

//Chamada ao método GET para obter um cliente do Splynx dado o seu id

export async function getCustomerById(
  id: number
): Promise<SplynxCustomer | undefined> {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/2.0/admin/customers/customer/${id}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );
    log.info(`(API) Retornando o cliente ${id}...`);
    return await response.data;
  } catch (e) {
    log.error(`(API) Falha ao requisitar o cliente ${id} : ${e}`);
    return undefined;
  }
}

//Chamada ao método GET para obter a lista de clientes

export async function getSplynxCustomers(): Promise<
  SplynxCustomer[] | undefined
> {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/2.0/admin/customers/customer`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );
    log.info(`(API) Retornando a lista de clientes...`);
    return await response.data;
  } catch (e) {
    log.error(`(API) Falha ao requisitar a lista de clientes : ${e}`);
    return undefined;
  }
}

//Chamada ao método GET para obter as estatísticas do cliente dado o seu id

export async function getCustomerStatistics(
  id: number
): Promise<SplynxCustomerStatistics | undefined> {
  try {
    const response = await axios.get(
      `${process.env.API_URL}api/2.0/admin/customers/customer-statistics/${id}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );
    log.info(`(API) Retornando as estatísticas do cliente ${id}...`);
    return await response.data;
  } catch (e) {
    log.error(`(API) Falha ao requisitar as estatísticas do cliente ${id} : ${e}`);
    return undefined;
  }
}
