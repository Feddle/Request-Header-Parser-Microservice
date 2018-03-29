
const express = require('express')
const app = express()

app.use(express.static('public'))


app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})
app.set('trust proxy', true);

app.get("/RHPM", (req, res) => {
  res.set('Content-Type', "application/json"); 
  var ip_addr = req.ip;
  var lang = req.get("Accept-Language");
  lang = lang.substring(0, lang.indexOf(";"));
  var soft = req.get("User-Agent");
  var soft_os = soft.substring(soft.indexOf("(") +1, soft.indexOf(")"));
  var obj = {"ip": ip_addr, "language": lang, "software": soft_os};
  res.send(JSON.stringify(obj));
})

app.get("*", (req, res) => {
  res.status(404).end("Page not found");
})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
