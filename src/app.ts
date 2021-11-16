import express from "express";
import invoicesRoute from "./Routes/invoices.routes";
import customerRoute from "./Routes/customers.routes";
import healthRoute from "./Routes/health.routes";
import webHookRoute from "./Routes/webhook.routes";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerOptions from "./Helper/swagger.options.json";
import cors from "cors";

dotenv.config();

const specs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use(express.json());
app.use(cors());

app.use("/invoices", invoicesRoute);
app.use("/customers", customerRoute);
app.use("/api", healthRoute);
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/webhook", webHookRoute);

app.listen(process.env.SERVER_PORT || 3000);
