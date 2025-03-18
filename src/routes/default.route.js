import { Router } from "express";
import { authorize, getUserInfo, healthCheck } from "../controllers/default.controller.js";

const router = Router()

router.route('/')
    .get(healthCheck)

/**
 * @param response_type
 * @param response_mode
 * @param client_id
 * @param redirect_uri
 * @param scope
 * > imagine that you want to log in to a service using your Google account. 
 * First, the service redirects you to Google in order to authenticate (if you are not already logged in) 
 * and then you will get a consent screen, where you will be asked to authorize the service to access some of your data 
 * (protected resources);
 */
router.route('/authorize')
    .post(authorize)

router.route('/userinfo') // get the userinfo
    .get(getUserInfo)

export default router;