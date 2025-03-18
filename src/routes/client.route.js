import { Router } from "router"
import { getUserDetails, onboardHandling } from "../controllers/client.controller.js";


const router = Router()

router.route('/onboard')
    .post(onboardHandling); // register client

router.route('/')
    .post(getUserDetails);

export default router;