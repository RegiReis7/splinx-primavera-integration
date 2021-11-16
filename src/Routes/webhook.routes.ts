import express from "express";
import { paymentListener } from "../Controller/webhook.controllers";

const routes = express.Router();

routes.post("/", paymentListener);

export default routes;
