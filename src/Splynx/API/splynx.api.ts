import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";
import http_build_query from "http-build-query";
import InvoiceSplinx from "../Model/invoice.models";
import log from "../../Log";
import SplynxCustomer from "../Model/customer.models";

dotenv.config();

var nonce_v = new Date().getTime();

//Autenticação básica para obter acesso à API do Splynx (usar caso a autenticação por assinatura falhar)

const token = Buffer.from(
  `${process.env.API_KEY}:${process.env.API_SECRET}`,
  "utf8"
).toString("base64");

//Autenticação de acesso à API do Splynx por assinatura

function signature() {
  log.info("Criando a chave de assinatura...");
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
    log.info("Retornando a lista de invoices...");
    return await axios.get(
      `${process.env.API_URL}/api/2.0/admin/finance/invoices`,
      {
        headers: {
          Authorization: `Splynx-EA (${getAuthString()})`,
        },
      }
    );
  } catch (e) {
    log.error(`Falha ao requisitar a lista de invoices: ${e}`);
  }
}

//Chamada ao método GET para obter um invoice dado o id

export async function getInvoiceById(
  id: number
): Promise<InvoiceSplinx | undefined> {
  try {
    log.info(`Retornando o invoice ${id}...`);
    return await axios.get(
      `${process.env.API_URL}/api/2.0/admin/finance/invoices/${id}`,
      {
        headers: {
          Authorization: `Splynx-EA (${getAuthString()})`,
        },
      }
    );
  } catch (e) {
    log.error(`Falha ao requisitar o invoice ${id} : ${e}`);
  }
}

//Chamada ao método GET para obter um cliente do Splynx dado o seu id

export async function getCustomerById(
  id: number
): Promise<SplynxCustomer | undefined> {
  try {
    log.info(`Retornando o cliente ${id}...`);
    return await axios.get(
      `${process.env.API_URL}/api/2.0/admin/customers/customer/${id}`,
      {
        headers: {
          Authorization: `Splynx-EA (${getAuthString()})`,
        },
      }
    );
  } catch (e) {
    log.error(`Falha ao requisitar o cliente ${id} : ${e}`);
  }
}

//Chamada ao método GET para obter a lista de clientes

export async function getSplynxCustomers(): Promise<
  SplynxCustomer[] | undefined
> {
  try {
    log.info(`Retornando a lista de clientes...`);
    return await axios.get(
      `${process.env.API_URL}/api/2.0/admin/customers/customer`,
      {
        headers: {
          Authorization: `Splynx-EA (${getAuthString()})`,
        },
      }
    );
  } catch (e) {
    log.error(`Falha ao requisitar a lista de clientes : ${e}`);
  }
}
