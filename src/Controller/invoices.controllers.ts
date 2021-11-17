import { createDocument } from "../Primavera/API/primavera.api";
import { getInvoices } from "../Splynx/API/splynx.api";
import { Request, Response } from "express";
import Primavera from "../Primavera/Model/primavera.models";
import { getCustomerById } from "../Splynx/API/splynx.api";
import log from "../Log";

export const exportInvoice = async (req: Request, res: Response) => {
  log.info("Getting the list of splynx invoices...");
  const splynxInvoicesList = await getInvoices();

  splynxInvoicesList
    .filter((e) => e.status === "Paid")
    .forEach(async (e) => {
      let document: Primavera;
      e.items.forEach((f) => {
        document.Linhas.push({ Artigo: f.description, Quantidade: f.quantity });
      });
      document.Entidade = (await getCustomerById(e.custumer_id)).name;
      document.DataDoc = e.date_created;
      createDocument(document)
        .then((result) => {
          res.status(201).json({
            message: `A document for invoice ${e.id} was created`,
          });
        })
        .catch((err) => res.status(400).json({ message: err.toString() }));
    });
};
