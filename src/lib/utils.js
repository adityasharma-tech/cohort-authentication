import fs from "fs/promises"

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


export {
    getPrivateKey,
    getPublicKey
}