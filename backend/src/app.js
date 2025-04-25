import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(cookieParser());

// import path from 'path'

// const __dirname = path.resolve()

app.use(
  cors({
    // origin : '*',
    origin : ["https://ujjwal-gadgets.vercel.app",'http://localhost:5173'],
    credentials: true,
  })
);
import userRoutes from "./routes/userRoutes.js";
app.use("/api/user", userRoutes);


import postRouter from "./routes/post.routes.js"
app.use("/api/post",postRouter)

// app.use(express.static(path.join(__dirname,"/frontend/dist")))
// app.get("*",(req,res) => {
//   res.sendFile(path.resolve(__dirname,"/frontend","dist","index.html"))
// })

export { app };
//http://localhost:5173/
