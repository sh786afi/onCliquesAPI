import express from "express";
import { addAdmin, adminLogin } from "./routes/myAdmin";

export default function createRouter() {
  const router = express.Router();
  router.post("/admin/signup", addAdmin);
  router.post("/admin/login", adminLogin);

  return router;
}
