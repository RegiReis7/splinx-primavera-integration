import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";
import http_build_query from "http-build-query";
import InvoiceSplinx from "../Model/invoice.models";
import log from "../../Log";
import SplynxCustomer from "../Model/customer.models";

dotenv.config();

var nonce_v = new Date().getTime();

//API Basic Athentication (use in case authecation by signature fails)

const token = Buffer.from(
  `${process.env.API_KEY}:${process.env.API_SECRET}`,
  "utf8"
).toString("base64");

//API Authentication By Signature

function signature() {
  log.info("Creating a signature");
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

//Calls the GET method for all invoices

export async function getInvoices() {
  try {
    return (await axios.get(
      `${process.env.API_URL}/api/2.0/admin/finance/invoices`,
      {
        headers: {
          Authorization: `Splynx-EA (${getAuthString()})`,
        },
      }
    )) as InvoiceSplinx[];
  } catch (e) {
    log.error(e);
  }
}

//GET invoice by a given id

export async function getInvoiceById(id: number) {
  try {
    return (await axios.get(
      `${process.env.API_URL}/api/2.0/admin/finance/invoices/${id}`,
      {
        headers: {
          Authorization: `Splynx-EA (${getAuthString()})`,
        },
      }
    )) as InvoiceSplinx;
  } catch (e) {
    log.error(e);
  }
}

//Calls the GET method for a customer by a given id

export async function getCustomerById(id: number) {
  try {
    return (await axios.get(
      `${process.env.API_URL}/api/2.0/admin/customers/customer/${id}`,
      {
        headers: {
          Authorization: `Splynx-EA (${getAuthString()})`,
        },
      }
    )) as SplynxCustomer;
  } catch (e) {
    log.error(e);
  }
}

//Calls the GET method to retrieve a list of customers

export async function getSplynxCustomers() {
  try {
    return (await axios.get(
      `${process.env.API_URL}/api/2.0/admin/customers/customer`,
      {
        headers: {
          Authorization: `Splynx-EA (${getAuthString()})`,
        },
      }
    )) as SplynxCustomer[];
  } catch (e) {
    log.error(e);
  }
}
