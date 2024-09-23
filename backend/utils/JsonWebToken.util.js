import jwt from "jsonwebtoken";

export function createToken(payload) {
  if (payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }
}
export function verifyToken(token) {
  if (token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}
