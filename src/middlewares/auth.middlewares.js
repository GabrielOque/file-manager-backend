import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.send({ message: "No hay token" });

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) return res.send({ message: "Token invalido" });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.send({ message: "A ocurrido un error" });
  }
};

export const adminAndSuperAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.send({ message: "No hay token" });
    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) return res.send({ message: "Token invalido" });
      if (user.rol !== "Admin" && user.rol !== "SuperAdmin")
        return res.send({
          message: "No tienes permisos para realizar esta acción",
        });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.send({ message: "A ocurrido un error" });
  }
};

export const superAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.send({ message: "No hay token" });
    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) return res.send({ message: "Token invalido" });
      if (user.rol !== "SuperAdmin")
        return res.send({
          message: "No tienes permisos para realizar esta acción",
        });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.send({ message: "A ocurrido un error" });
  }
};
