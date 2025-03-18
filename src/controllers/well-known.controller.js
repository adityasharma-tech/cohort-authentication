import { openIdJsonConfig } from "../lib/config.js";

const openIdConfiguration = (req, res, _) => {
    res.status(200).json(openIdJsonConfig)
}

export {
    openIdConfiguration
}