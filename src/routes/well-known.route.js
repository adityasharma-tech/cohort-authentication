import { Router } from "express";
import { openIdConfiguration } from "../controllers/well-known.controller.js";

const router = Router()

router.route('/openid-configuration')
    .get(openIdConfiguration);

export default router;