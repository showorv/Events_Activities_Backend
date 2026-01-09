import express, { Application, Request, Response } from "express"

import cors from "cors"

// import { globalError } from "./app/middlewares/globalErrorHandle"
// import { routeNotFound } from "./app/middlewares/routeNotFound"
import cookieParser from "cookie-parser"

import { router } from "./app/route"
import { globalError } from "./app/middlewares/globalErrorHandler"
import { routeNotFound } from "./app/middlewares/routeNotFound"



const app:Application = express()


app.use(cookieParser())
app.use(express.json())

app.use(express.urlencoded({extended: true})) 

app.use(cors({
    origin:  ["https://events-activities-frontend-ochre.vercel.app",  "http://localhost:3000"],
    credentials: true
}))



app.use("/api/v1", router)

app.get("/",(req: Request,res: Response)=>{
    res.status(200).json({
        message: "Welcome to Events & Activites backend"
    })
})



// route not found

app.use(routeNotFound)


app.use(globalError)

export default app;