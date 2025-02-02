const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).send({
      message: "Access Denied",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Verified User:", verified);
    req.user = verified;
    next();
  } catch (error) {
    console.log("Token Error:", error.message);
    return res.status(400).send({
      message: "invalid Token",
    });
  }
};
