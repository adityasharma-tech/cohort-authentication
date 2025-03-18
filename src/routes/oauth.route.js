import { Router } from "express";

const router = Router()

router.route('/token') // get the authorization accessToken using oauth

router.route('/device/code') // TODO: pata nahi kya hai

router.route('/revoke') // remove the refresh token from the database

export default router;