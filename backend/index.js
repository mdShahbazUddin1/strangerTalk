const express = require("express");
const cors = require("cors");
const connection = require("./config/DB");
const userRoute = require("./routes/user.routes");
const historyRoute = require("./routes/callHistory.routes");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(express.json());
app.use(cors());

app.use("/auth", userRoute);
app.use("/call", historyRoute);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${PORT}`);
});
