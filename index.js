const express = require("express");
const main = require("./configs/db");
const userRouter = require("./routes/user");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("my res from backend");
});

app.use("/user", userRouter);
app.listen(8082, () => {
  main();
  console.log("server is runing-8082");
});
