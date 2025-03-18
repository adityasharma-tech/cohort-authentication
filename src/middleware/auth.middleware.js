// import jwt from "jsonwebtoken"

import { PrismaClient } from "@prisma/client";

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

const clientAuthMiddleware = async function (req, res, next) {
    const clientId = req.headers['x-client-id'];
    const clientSecret = req.headers['x-client-secret'];

    if(![clientId, clientSecret].some((value) => (value ? value.trim() != "" : false)))
        return res
        .status(401)
        .json({message: "Unauthorized" });

    try {
        
        const prisma = new PrismaClient();
    
        const user = await prisma.user.findFirst({
            where: {
                clientId: clientId.trim(),
                clientSecret: clientSecret.trim()
            }
        });
    
        if(!user) return res
        .status(401)
        .json({message: "Unauthorized: Invalid credentials." });

        req.user = {
            ...user,
            passwordHash: undefined,
            createdAt: undefined,
            updatedAt: undefined
        }
    } catch (error) {
        return res
        .status(500)
        .json({message: "Internal server error" });
    }

    next()
}

export {
    clientAuthMiddleware
}