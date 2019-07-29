import { comparePassword } from "../lib/crypto";
import AdminModel from "../db/adminModel";
import { route, successRoute } from "./";

export const addAdmin = route(
  async (req, res) => {
    const { AdminName, Occupation, email, password } = req.body;
    const result = await AdminModel.adminSignUp(
      AdminName,
      Occupation,
      email,
      password
    );
    res.send(await successRoute(result));
  },
  {
    requiredFields: ["AdminName", "Occupation", "email", "password"]
  }
);
export const adminLogin = route(async (req, res) => {
  const { email, password } = req.body;
  const adminUser = await AdminModel.findAdminUser(email, password);
  const isMatch = await comparePassword(
    req.body.password,
    adminUser.adminUser.password
  );
  if (!isMatch) {
    res.status(404).send({ error: "Incorrect Password" });
  }
  res.send(await successRoute(adminUser));
});
