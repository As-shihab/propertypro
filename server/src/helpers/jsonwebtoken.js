const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error("unauthorized :", error);
    return res.status(403).json({ error: "Invalid token" });
  }
};

const createToken = async (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "48h",
  });

  return token;
};

module.exports = { verifyToken, createToken };
