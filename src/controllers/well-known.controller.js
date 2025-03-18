import { openIdJsonConfig } from "../lib/config.js";
import { getPublicKey } from "../lib/utils.js"

const openIdConfiguration = (_, res) => {
    res.status(200).json(openIdJsonConfig)
}

const handleGetPublicKeys = async (_, res) => {
    const publicKey = await getPublicKey()
    const payload = {
        keys: [
            {
                kty: "RSA",
                n: publicKey,
                alg: "RS256",
                // use: "",
                // e: "",
                // kid: ""
            }
        ]
    }
    
    res.status(200).json(payload);
}

export {
    openIdConfiguration,
    handleGetPublicKeys
}