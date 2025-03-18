import fs from "fs/promises"
import jwt from "jsonwebtoken";
import jose from "node-jose";

const { JsonWebTokenError, TokenExpiredError } = jwt;

async function getPrivateKey(){
    try {
        const filedata = await fs.readFile('./keys/keys.json', "utf-8");
        const keyStore = await jose.JWK.asKeyStore(filedata.toString())
        const [key] = keyStore.all({ use: 'sig' })
        return key; 
    } catch (error) {
        console.error(`Failed to read private key file: ${error.message}`);
    }
}

async function getPublicKey(){
    try {
        const filedata = await fs.readFile('./keys/keys.json', "utf-8");
        const result = (await jose.JWK.asKeyStore(filedata)).toJSON();
        return result
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
            exzp: Date.now() + (60 * 5 * 1000),
            iat: Date.now(),
            email,
            email_verified,
            name,
            phone_number, // $optional,
            picture, // $optional,
            scopes
        }
        const opt = { compat: true, jwk: privateKey, fields: { typ: 'jwt' } }
        const accessToken = await jose.JWS.createSign(opt, privateKey)
            .update(JSON.stringify(payload))
            .final()
            console.log(JSON.stringify(accessToken))
        return `${accessToken.signatures[0].protected}.${accessToken.payload}.${accessToken.signatures[0].signature}`;
    } catch (error) {
        console.error(error)
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
            sub,
            aud,
            exp: Date.now() + (60 * 60 * 24 * 5 * 1000),
            iat: Date.now()
        }
        const opt = { compat: true, jwk: privateKey, fields: { typ: 'JWT' } }
        const refreshToken = await jose.JWS.createSign(opt, privateKey)
            .update(JSON.stringify(payload))
            .final()
        return `${refreshToken.signatures[0].protected}.${refreshToken.payload}.${refreshToken.signatures[0].signature}`;
    } catch (error) {
        console.error(error)
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