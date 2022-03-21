const express = require("express");
const {google} = require("googleapis");
const auth = require("../utils/createAuthJWT");

const router = express.Router();
router.post("/", (req, res) => {
  const body = req.body;
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.append({
  auth: auth,
  spreadsheetId: process.env.SPREADSHEET_ID,
  valueInputOption: "USER_ENTERED",
  range: "Sheet1",
  resource: 
    { 
      values: [[body.name, body.email, body.commonUncommons, body.rareFoils, body.v, body.vmax, body.gx]]
    }
  }, (err, res) => {
  console.log(res);
  if (err) return console.log("API Returned an error: " + err);
  })
  res.json({success: "Bulk submission received"})
});

module.exports = router;