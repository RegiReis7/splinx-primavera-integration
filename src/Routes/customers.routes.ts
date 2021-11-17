import express from "express";
import {
  exportCustomer,
  getSplynxCustomerRoute,
} from "../Controller/customers.controller";

const routes = express.Router();

routes.get("/export", exportCustomer);
routes.get("/:id", getSplynxCustomerRoute);

export default routes;
