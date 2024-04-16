const express = require("express");
const cors = require("cors");
const connection = require("./config/DB");
const userRoute = require("./routes/user.routes");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRoute);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${PORT}`);
});
