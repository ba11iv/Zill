const express = require("express");
const cors = require("cors");
require("dotenv").config();

const screenshotRoute = require("./routes/screenshot");
const linkRoute = require("./routes/link");
const financialTwinRoute = require("./routes/financialTwin");
const messageRoute = require("./routes/message");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Zill Backend is Running!");
});
app.use(express.static("."));

app.use("/analyze-screenshot", screenshotRoute);
app.use("/analyze-link", linkRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

