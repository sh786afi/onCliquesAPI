import express from "express";
import createRouter from "./router";

const app = express();
app.use(express.json());
app.use(createRouter());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
