import fs from "fs/promises"
import jwt from "jsonwebtoken";

const { JsonWebTokenError, TokenExpiredError } = jwt;

async function getPrivateKey(){
    try {
        const filedata = await fs.readFile('./keys/auth_key.pem', "utf-8");
        return filedata;
    } catch (error) {
        console.error(`Failed to read private key file: ${error.message}`);
    }
}

async function getPublicKey(){
    try {
        const filedata = await fs.readFile('./keys/auth_key.pub', "utf-8");
        return filedata;
    } catch (error) {
        console.error(`Failed to read public key file: ${error.message}`);
    }
}


const handleSignAccessToken = async function ({
    sub,
    aud,
    email,
    email_verified=false,
    name,
    phone_number,
    picture,
    scopes
}) {
    const privateKey = await getPrivateKey();
    try {
        const payload = {
            iss: process.env.DOMAIN,
            sub, // TODO: get the userid from the login database
            aud, // client_id
            exp: Date.now() + (60 * 5 * 1000),
            iat: Date.now(),
            email,
            email_verified,
            name,
            phone_number, // $optional,
            picture, // $optional,
            scopes
        }
        const accessToken = jwt.sign(payload, privateKey, {
            algorithm: "RS256"
        })
        return accessToken;
    } catch (error) {
        console.error(`Failed to sign accessToken: ${error.message}`)
    }
}


const handleSignRefreshToken = async function ({
    sub,
    aud
}) {
    const privateKey = await getPrivateKey();
    try {
        const payload = {
            iss: process.env.DOMAIN,
            sub, // TODO: get the userid from the login database
            aud, // client_id ?????????????????????????????
            exp: Date.now() + (60 * 60 * 24 * 5 * 1000),
            iat: Date.now()
        }
        const refreshToken = jwt.sign(payload, privateKey, {
            algorithm: "RS256"
        })
        return refreshToken;
    } catch (error) {
        console.error(`Failed to sign refreshToken: ${error.message}`);
    }
}

const isRefreshTokenValid = async function (refreshToken) {
    const publicKey = await getPublicKey();
    try {
        const nRefToken = jwt.verify(refreshToken, publicKey, {
            algorithms: "RS256"
        })
        if(nRefToken.exp < Date.now()) return null
            return nRefToken.sub;
    } catch (error) {
        console.error(`isRefreshTOkenExpired.err: ${error.message}`)
        if(error instanceof TokenExpiredError) return null
        else if(error instanceof JsonWebTokenError) return null
        else {
            console.error(`Internal server error: ${error.message}`);
            return null;
        }
    }
}


export {
    getPrivateKey,
    getPublicKey,
    handleSignAccessToken,
    handleSignRefreshToken,
    isRefreshTokenValid
}