import { Request, Response } from "express";
import log from "../Log";
import {
  createCustomer,
  createDocument,
  customerExists,
} from "../Primavera/API/primavera.api";
import Primavera, {
  PrimaveraCustomer,
} from "../Primavera/Model/primavera.models";
import {
  getCustomerById,
  getCustomerStatistics,
  getInvoiceById,
} from "../Splynx/API/splynx.api";
import SplynxWebhook from "../Splynx/Model/webhook.models";

export const paymentListener = async (req: Request, res: Response) => {
  if (req.body) {
    const webHookBody = req.body as SplynxWebhook;
    log.info(`Informação do webhook recebida: ${JSON.stringify(webHookBody)}`);
    res.status(200).json({ mensagem: "Informação do webhook recebida" });

    try {
      const invoince = await getInvoiceById(
        webHookBody.data.attributes.invoice_id
      );
      const customer = await getCustomerById(webHookBody.data.customer_id);

      const tariff = await getCustomerStatistics(webHookBody.data.customer_id);

      const customerPrimavera = await customerExists(
        webHookBody.data.customer_id
      );

      if (customerPrimavera) {
        let document: Primavera;
        invoince.items.forEach((e) => {
          document.Linhas.push({
            Artigo: tariff.tariff_id,
            Quantidade: e.quantity,
            //IVA: e.tax,
            //Descricao: e.description,
            //Total_Liquido: webHookBody.data.attributes.amount,
          });
        });
        document.Entidade = customer.id;
        document.DataDoc = webHookBody.data.attributes.date;

        log.info("Documento criado");
        await createDocument(document);
      } else {
        const customerModel: PrimaveraCustomer = {
          Cliente: customer.id,
          Nome: customer.name,
          Morada: customer.street_1,
          Localidade: customer.city,
          CodigoPostal: customer.zip_code,
          Telefone: customer.phone,
          EnderecoWeb: customer.email,
          NumContribuinte:
            customer.additional_attributes.numero_de_identificacao_fiscal,
        };

        await createCustomer(customerModel);

        let document: Primavera;
        invoince.items.forEach((e) => {
          document.Linhas.push({
            Artigo: tariff.tariff_id,
            Quantidade: e.quantity,
            //IVA: e.tax,
            //Descricao: e.description,
            //Valor: webHookBody.data.attributes.amount,
          });
        });
        document.Entidade = customer.id;
        document.DataDoc = webHookBody.data.attributes.date;

        log.info("Documento criado");
        await createDocument(document);
      }
    } catch (e) {
      log.err(`Erro ao criar o documento: ${e}`);
    }
  } else {
    log.error(`Informação do webhook não recebida...`);
    res
      .status(400)
      .json({ mensagem: "Informação do webhook não foi recebida" });
  }
};
