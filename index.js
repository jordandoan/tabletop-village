require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bulkRouter = require("./api/bulkSubmissionForm");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/bulk", bulkRouter);

app.get("/", (req, res) => {
  res.json({success: "Jordan's Node Server for Table Top Village"});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listening on port " + port)
})
