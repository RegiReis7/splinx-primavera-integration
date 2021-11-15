import { PrimaveraCustomer } from "../Primavera/Model/primavera.models";
import { Request, Response } from "express";
import { getSplynxCustomers } from "../Splynx/API/splynx.api";
import { createCustomer } from "../Primavera/API/primavera.api";
import log from "../Log";

export const exportCustomer = async (req: Request, res: Response) => {
  
  log.info("Getting the list of splynx customers...");
  const customers = await getSplynxCustomers();

  customers.forEach((e) => {
    let primaveraCustomer: PrimaveraCustomer = {
      Cliente: e.login,
      Nome: e.name,
      Morada: e.street_1,
      Localidade: e.city,
      CodigoPostal: e.zip_code,
      Telefone: e.phone,
      EnderecoWeb: e.email,
    };
    createCustomer(primaveraCustomer)
      .then((result) => {
        res.status(200).json({ message: `${e.name} was exported` });
      })
      .catch((err) => {
        res.status(400).json({
          message: err.toString(),
        });
      });
  });
};
