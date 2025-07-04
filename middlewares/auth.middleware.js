import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const autherize = async (req, res, next) => {
    try {

        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            res.status(401).json({
                success: false,
                message: "unauthorized",

            });
        }

        const decoded = await jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            res.status(401).json({
                success: false,
                message: "unauthorized",

            });

        }
        req.user = user;
        next();

    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "unauthorized",
            error: error.message

        });
    }
}

export default autherize;