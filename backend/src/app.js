const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const followRouter = require("./routes/follow.routes")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))



app.use("/auth", authRouter)
app.use("/api/post", postRouter)
app.use("/api", followRouter)

module.exports = app