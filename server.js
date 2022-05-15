const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const axios = require("axios");

app.use(cors());

app.get("/giphy", (req, res) => {
  console.log(`Searching for a gif with the term: ${req.query.term}`);

  let params = req.query.term.replace(/ /g, "+");
  params += "&api_key=CkSfNBxJPlR95jPgpMRJfOCFh0VWpV24";
  params += "&limit=10";

  axios
    .get(`https://api.giphy.com/v1/gifs/search?q=${params}`)
    .then((response) => {
      res.send({
        success: true,
        data: response.data.data,
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        data: [],
      });
    });
});

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});
