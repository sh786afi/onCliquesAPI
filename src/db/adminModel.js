import Admin from "../schema/admin.schema";
import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";
import { generateToken } from "../lib/token";
import { hashPassword } from "../lib/crypto";

export class AdminModel extends BaseModel {
  constructor(connection) {
    super("ADMININFO", connection);
    this.AdminSchema = Admin;
    this.AdminName = "ADMININFO";
    this.AdminModel = this.connection.model(this.AdminName, this.AdminSchema);
  }
  adminSignUp = async (AdminName, Occupation, email, password) => {
    if (!this.AdminModel) {
      await this._getModel();
    }
    const newAdmin = {
      AdminName,
      Occupation,
      email,
      password: await hashPassword(password)
    };
    const findEmail = await this.AdminModel.findOne({ email });
    if (findEmail === null) {
      const createAdmin = await this.AdminModel.create(newAdmin);
      const adminResult = await createAdmin.save();
      const token = await generateToken(adminResult._id);
      return { adminResult, token };
    } else {
      throw new ApplicationError(
        "Something doesn’t look right. Please check your email ID and password again",
        401
      );
    }
  };
  findAdminUser = async (email, password) => {
    const adminUser = await this.AdminModel.findOne({ email });
    if (!adminUser) {
      throw new ApplicationError(
        "Something doesn’t look right. Please check your email ID and password again.",
        401
      );
    }
    const token = await generateToken(adminUser._id);
    const result = { adminUser, token };
    // console.log(result);
    return result;
  };
}
export default new AdminModel();
