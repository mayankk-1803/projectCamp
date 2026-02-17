import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

//middleware
app.use(express.json({ limit: "16kb"}))
app.use(urlencoded({extended: true, limit: "32kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//cors configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type","AUTHORIZATION"]
}))

//import the routes

import authRouter from "./routes/auth.routes.js"
app.use("/api/v1/auth", authRouter)

app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.get('/instagram', (req,res) => {
    res.send("This is an instagram page..")
})

export default app;