const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const UserRoutes = require("./Routes/UserRoutes");
const CreatePost = require("./Routes/Createpost");
const Readpost = require("./Routes/Readpost");
const cookieParser = require('cookie-parser')

app.use(cors({origin: "http://localhost:5173",credentials:true}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use(cookieParser())
app.use("/", UserRoutes);
app.use("/", CreatePost);
app.use("/", Readpost);

app.listen(3000, console.log("Listening on Port 3000"));
