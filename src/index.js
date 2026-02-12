import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './db/index.js'

dotenv.config()

const PORT = process.env.PORT || 3000

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log("Server is Running");
    })
})
.catch((err) => {
    console.error("MongoDB Connection Error", err);
    process.exit(1)
})