import { Request, Response } from "express";
import log from "../Log";
import { createDocument } from "../Primavera/API/primavera.api";
import Primavera from "../Primavera/Model/primavera.models";
import { getCustomerById, getInvoiceById } from "../Splynx/API/splynx.api";
import SplynxWebhook from "../Splynx/Model/webhook.models";

export const paymentListener = async (req: Request, res: Response) => {
  const webHookBody = req.body as SplynxWebhook;
  /*const invoince = await getInvoiceById(webHookBody.data.attributes.invoice_id);
  const customer = await getCustomerById(webHookBody.data.customer_id);

  let document: Primavera;
  invoince.items.forEach((e) => {
    document.Linhas.push({ Artigo: e.description, Quantidade: e.quantity });
  });
  document.Entidade = customer.name;
  document.DataDoc = webHookBody.data.attributes.date;

  try {
    await createDocument(document);
  } catch (e) {
    log.err(e);
  }*/

  log.info(webHookBody);
  res.status(200).json({ message: "Received" });
};
