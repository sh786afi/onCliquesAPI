import { ApplicationError } from "../lib/errors";
import { decodeToken, generateToken } from "../lib/token";
import AdminModel from "../db/adminModel";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    next(
      new ApplicationError(
        "Missing Authorization header with Bearer token",
        401
      )
    );
    return;
  }

  // strip the leading "Bearer " part from the rest of the token string
  // const token = authHeader.substring("Bearer ".length);
  try {
    const decoded = await decodeToken(authHeader);
    const user = await AdminModel.getAdminById(decoded.id);
    req.user = user;

    if (!user) {
      throw new ApplicationError("Not found");
    }
    next();
  } catch (err) {
    // assume failed decoding means bad token string
    next(new ApplicationError("Could not verify token", 401));
  }
};
