import express from "express";
import {
  exportCustomer,
  getSplynxCustomer,
  getPrimaveraCustomer,
} from "../Controller/customers.controllers";

const routes = express.Router();

routes.get("/export", exportCustomer);
routes.get("/splynx/:id", getSplynxCustomer);
routes.get("/primavera/:id", getPrimaveraCustomer);

export default routes;
