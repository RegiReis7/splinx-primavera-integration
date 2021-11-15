import express from "express";
import { exportInvoice } from "../Controller/invoices.controllers";

const routes = express.Router();

routes.get("/export", exportInvoice);

export default routes;
