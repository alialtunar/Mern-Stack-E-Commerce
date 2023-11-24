const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authenticatonmid = async (req, res, next) => {
  const  token  = req.headers.authorization.split(" ")[1];
  try {
    if (!token) {
      return res.status(405).json({ message: "yetkisiz işlem" });
    }
  
    const decodeToken = jwt.verify(token, "SECRETTOKEN");
  
    if (!decodeToken) {
      return res.status(500).json({
        message: "erişim yetkiniz yok",
      });
    }
  
    req.user = await User.findById(decodeToken.id);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message});
  }

  
};

const roleChecked = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(405).json({ message: "erişim yetkiniz yok" });
    } else {
      next();
    }
  };
};

module.exports = { authenticatonmid, roleChecked };
