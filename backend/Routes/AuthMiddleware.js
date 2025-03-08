const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  
  const token =
    req.cookies.token 
  if (!token) {
    return res.status(401).json({ message: "Unauthorized No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or Expired Token" });

  }
};

module.exports = authenticateUser;
