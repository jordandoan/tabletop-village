const express = require("express");
const {google} = require("googleapis");
const auth = require("../utils/createAuthJWT");

const router = express.Router();
router.post("/", (req, res) => {
  const body = req.body;
  let total = 0.005*Number(body.commonUncommons) + 0.04*Number(body.rareFoils) + 0.50*Number(body.v) + (Number(body.vmax) + Number(body.gx));
  total = Math.floor(total*100)/100;
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.append({
  auth: auth,
  spreadsheetId: process.env.SPREADSHEET_ID,
  valueInputOption: "USER_ENTERED",
  range: "Sheet1",
  resource: 
    { 
      values: [[body.name, body.email, body.commonUncommons, body.rareFoils, body.v, body.vmax, body.gx, total]]
    }
  }, (err, res) => {
  if (err) return console.log("API Returned an error: " + err);
  })
  res.json({success: "Bulk submission received! Total: " + total})
});

module.exports = router;
