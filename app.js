const express = require("express");
const cors = require("cors");
const profesoresRouter = require("./routes/profesores");
const authRouter = require("./routes/auth");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/profesores", profesoresRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});