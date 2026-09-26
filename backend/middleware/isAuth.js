import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const verifyToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user_id = verifyToken.user_id;

        next();

    } catch (error) {
        console.error("Auth error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default isAuth;