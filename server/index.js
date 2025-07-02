import express from 'express';
import cors from 'cors'
import connectToMongoDB from './db/db.js';
import authRouter from './routes/auth.js'

const app = express()


app.use(cors())
app.use('/api/auth',authRouter)
app.use(express.json())

app.listen(5000,() => {
    connectToMongoDB();
    console.log("server is running")
})