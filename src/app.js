import express, { urlencoded } from 'express'
import cors from 'cors'

const app = express()

//middleware
app.use(express.json({ limit: "16kb"}))
app.use(urlencoded({extended: true, limit: "32kb"}))
app.use(express.static("public"))

//cors configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type","AUTHORIZATION"]
}))

app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.get('/instagram', (req,res) => {
    res.send("This is an instagram page..")
})

export default app;