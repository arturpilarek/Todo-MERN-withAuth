const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.header("authorization");
        // Create array with two elements and choose second one, because the header we're sending is in bearer token convention, basically we just want to get token
        const token = authHeader.split(' ')[1]
        if(!token) return res.status(401).json({msg: "No authentication token, access denied"});

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.status(401).json({msg: "Token verification failed, authorization denied"});

        req.user = verified.id;
        //If verified allow next function
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}