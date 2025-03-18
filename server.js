import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import express from "express";
import cookieParser from "cookie-parser";

const app = express()

const port = process.env.PORT || 5178;

app.use(cors({
    methods: ["POST", "GET", "OPTIONS"]
}))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

/**
 * Route imports
 */
import wellKnownRouter from "./src/routes/well-known.route.js"
import defaultRouter from "./src/routes/default.route.js"
import oauthRouter from "./src/routes/oauth.route.js"
import oidcRouter from "./src/routes/oidc.route.js"
import clientRouter from "./src/routes/client.route.js"

/**
 * routers
 */
app.use(defaultRouter)
app.use('/oidc', oidcRouter)
app.use('/oauth', oauthRouter)
app.use('/client', clientRouter)
app.use("/.well-known", wellKnownRouter)

/**
 * server listening
 */
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})