import { PrimaveraCustomer } from "../Primavera/Model/primavera.models";
import { Request, Response } from "express";
import { getCustomerById, getSplynxCustomers } from "../Splynx/API/splynx.api";
import { createCustomer, customerExists } from "../Primavera/API/primavera.api";
import log from "../Log";

export const exportCustomer = async (req: Request, res: Response) => {
  log.info("Recebendo a lista de clientes...");
  const customers = await getSplynxCustomers();

  if (customers) {
    customers.forEach((e) => {
      let primaveraCustomer: PrimaveraCustomer = {
        Cliente: e.id,
        Nome: e.name,
        Morada: e.street_1,
        Localidade: e.city,
        CodigoPostal: e.zip_code,
        Telefone: e.phone,
        EnderecoWeb: e.email,
        NumContribuinte: e.additional_attributes.numero_de_identificacao_fiscal,
      };
      createCustomer(primaveraCustomer)
        .then((result) => {
          res.status(200).json({ mensagem: `${e.name} foi exportado` });
        })
        .catch((err) => {
          res.status(400).json({
            message: err.toString(),
          });
        });
    });
  } else {
    log.error(`Erro ao requisitar a lista de clientes!`);
    res
      .status(400)
      .json({ mensagem: "Erro ao requisitar a lista de clientes" });
  }
};

export const getSplynxCustomer = async (req: Request, res: Response) => {
  log.info("Recebendo o cliente Splynx...");
  const customer = await getCustomerById(+req.params.id);

  if (customer) {
    log.info(`Id do cliente: ${customer.id} Nome do cliente: ${customer.name}`);
    res.status(200).json({ mensagem: "sucesso!", clienteRetornado: customer });
  } else {
    log.error(`Erro ao requisitar o cliente!`);
    res.status(400).json({ mensagem: "Erro ao requisitar o cliente" });
  }
};

export const getPrimaveraCustomer = async (req: Request, res: Response) => {
  log.info("Recebendo o cliente Primavera...");
  const customer = await customerExists(+req.params.id);

  if (customer) {
    log.info(
      `Id do cliente: ${customer.Cliente} Nome do cliente: ${customer.Nome}`
    );
    res.status(200).json({ mensagem: "sucesso!" });
  } else {
    log.error(`Erro ao requisitar o cliente!`);
    res.status(400).json({ mensagem: "Erro ao requisitar o cliente" });
  }
};
