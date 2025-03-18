import { openIdJsonConfig } from "../lib/config.js";
import { getPublicKey } from "../lib/utils.js"
import jose from "node-jose"

const openIdConfiguration = (_, res) => {
    res.status(200).json(openIdJsonConfig)
}

const handleGetPublicKeys = async (_, res) => {
    const publicKey = await getPublicKey()
    
    res.status(200).json(publicKey);
}

export {
    openIdConfiguration,
    handleGetPublicKeys
}