const { Router } = require("express");

const router = Router()

router.route('/onboard')
    .post() // register client

export default router;