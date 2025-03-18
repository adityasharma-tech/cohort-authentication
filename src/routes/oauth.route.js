import { Router } from "express";
import { handleGetAccessToken, handleRefreshAccessToken, handleRevokeTokenScope } from "../controllers/oauth.controller.js";
import { clientAuthMiddleware } from "../middleware/auth.middleware.js";

const router = Router()

router.route('/token') // get the authorization accessToken using oauth
    .post(clientAuthMiddleware, handleGetAccessToken)

router.route('/device/code') // TODO: pata nahi kya hai

router.route('/refreshAccessToken')
    .post(handleRefreshAccessToken)

router.route('/revoke') // remove the refresh token from the database
    .post(handleRevokeTokenScope)

export default router;