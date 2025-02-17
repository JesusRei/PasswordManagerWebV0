const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied, no token provided!" });
  }

  const token = authHeader.split(" ")[1]; // Obtener el token del header

  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token is not valid!" });
  }
};

module.exports = authMiddleware;
