import express from "express";
import { exportCustomer } from "../Controller/customers.controller";

const routes = express.Router();

routes.get("/export", exportCustomer);

export default routes;
