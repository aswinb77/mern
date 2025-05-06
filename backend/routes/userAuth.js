const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    // 🔥 Retrieve the token from the request headers
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ mssg: "Authentication token required" });
    }

    // 🔥 Verify the token
    jwt.verify(token, "Latex123", (err, user) => {
        if (err) {
            return res.status(403).json({ mssg: "Invalid or expired token" });
        }
        req.user = user;   // Attach the decoded token to the request
        next();
    });
};

module.exports = { authenticateToken };
