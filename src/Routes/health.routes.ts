import express from "express";

const routes = express.Router();

routes.get("/health", (req, res) => {
  res.status(200).json({ message: `Working Fine` });
});

export default routes;
