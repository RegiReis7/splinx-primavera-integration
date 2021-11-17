import { Request, Response } from "express";
import log from "../Log";
import { createDocument } from "../Primavera/API/primavera.api";
import Primavera from "../Primavera/Model/primavera.models";
import { getCustomerById, getInvoiceById } from "../Splynx/API/splynx.api";
import SplynxWebhook from "../Splynx/Model/webhook.models";

export const paymentListener = async (req: Request, res: Response) => {
  if (req.body) {
    const webHookBody = req.body as SplynxWebhook;
    log.info(`Informação do webhook recebida: ${JSON.stringify(webHookBody)}`);
    res.status(200).json({ mensagem: "Informação do webhook recebida" });

    /*try {
      const invoince = await getInvoiceById(
        webHookBody.data.attributes.invoice_id
      );
      const customer = await getCustomerById(webHookBody.data.customer_id);
  
      let document: Primavera;
      invoince.items.forEach((e) => {
        document.Linhas.push({ Artigo: e.description, Quantidade: e.quantity });
      });
      document.Entidade = customer.name;
      document.DataDoc = webHookBody.data.attributes.date;
  
      await createDocument(document);
      log.info("Documento criado");
    } catch (e) {
      log.err(`Erro ao criar o documento: ${e}`);
    }*/
  } else {
    log.error(`Informação do webhook não recebida...`);
    res
      .status(400)
      .json({ mensagem: "Informação do webhook não foi recebida" });
  }
};
