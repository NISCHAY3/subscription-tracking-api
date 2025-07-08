import aj from "../config/arcject.js";


const arcjetMiddleware = async (req, res, next) => {
    try {

        const decision = await aj.protect(req, { requested: 1 });
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({
                    error: "rate limit excedded"
                });
            }

            if (decision.reason.isBot()) {
                return res.status(403).json({
                    error: "bot detected"
                });
            }
            return res.status(403).json({
                error: 'access denied'
            });
        }

        next();
    }

    catch (error) {
        console.log(`Arcjet errror ${error.message}`);
        next(error);
    }
}


export default arcjetMiddleware;