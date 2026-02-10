import express from ' express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.get('/instagram', (req,res) => {
    res.send("This is an instagram page..")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})