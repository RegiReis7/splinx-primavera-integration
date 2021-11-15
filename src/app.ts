import log from "./Log";
import express from "express";
import invoicesRoute from "./Routes/invoices.routes";
import customerRoute from "./Routes/customers.routes";
import healthRoute from "./Routes/health.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use("/invoices", invoicesRoute);
app.use("/customers", customerRoute);
app.use("/api", healthRoute);

app.listen(process.env.SERVER_PORT, () => {
  log.info(`O aplicativo está executando na porta ${process.env.SERVER_PORT}`);
});
