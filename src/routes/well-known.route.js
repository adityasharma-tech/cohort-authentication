import { Router } from "express";
import { handleGetPublicKeys, openIdConfiguration } from "../controllers/well-known.controller.js";

const router = Router()

// public routes
router.route('/openid-configuration')
    .get(openIdConfiguration);

router.route('/jwks.json')
    .get(handleGetPublicKeys);

export default router;