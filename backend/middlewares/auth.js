const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: "No token, authentication denied" });
        }

        // 1. Fixed typo: jwt.verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 2. Fixed typo: User.findById
        const user = await User.findById(decoded.id).select('-password'); // .select('-password') is a good practice

        if (!user) {
            // 3. Fixed response chaining
            return res.status(401).json({ message: "User not found" });
        }
        
        // 4. (Improvement) Attach the user to the request object
        req.user = user; 
        
        // 5. CRITICAL: Call next() to proceed to the route
        next(); 

    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = auth;