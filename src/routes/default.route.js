import { Router } from "express";
import { authorize, getUserInfo, healthCheck } from "../controllers/default.controller.js";

const router = Router()

router.route('/')
    .get(healthCheck)

router.route('/authorize') // dekna padega ache se
    .post(authorize)

router.route('/userinfo') // get the userinfo
    .get(getUserInfo)

export default router;