require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const axios = require("axios");

app.use(cors());

app.get("/giphy", async (req, res, next) => {
  console.log(`Searching for a gif with the term: ${req.query.term}`);

  try {
    if (!process.env.GIPHY_API_KEY) {
      throw new Error("You forgot to set GIPHY_API_KEY");
    }

    let params = req.query.term.replace(/ /g, "+");
    params += `&api_key=${process.env.GIPHY_API_KEY}`;
    params += "&limit=10";

    let response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?q=${params}`
    );

    if (response.status === 200) {
      res.send({
        success: true,
        data: response.data.data,
      });
    } else {
      res.send({
        success: false,
        data: [],
      });
    }
  } catch (error) {
    next(error);
  }
});

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});
