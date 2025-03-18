// import jwt from "jsonwebtoken"

// const authMiddleware = async (req, res, next) => {
//     const cookies = req.cookies;

//     const clientSecret = cookies?.clientSecret || req.headers?.clientSecret;

//     if (!clientSecret)
//         return res.status(401).json(new Error('Unauthorized'));
//     try {
//         const decodedUser = jwt.verify(clientSecret, process.);
//         console.warn(`Decoded user: ${JSON.stringify(decodedUser)}`);

//         req.user = decodedUser;
//     } catch (error) {
//         console.error(`Error during accessing middleware: ${error.message}`)
//         if (error instanceof jwt.TokenExpiredError)
//             return res.status(401).json(new Error('Unauthorized: Token expired.'))
//         else if (error instanceof jwt.JsonWebTokenError)
//             return res.status(401).json(new Error('Unauthorized: Invalid token.'))
//         else return res.status(401).json(new Error('Unauthorized'))
//     }
//     next()
// }

// export {
//     authMiddleware
// }