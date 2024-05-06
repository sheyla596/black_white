const express = require("express");
const app = express();
const port = 3000;
const jimp = require("jimp");
const path = require('path');
const { v4: uuidv4 } = require("uuid");



app.listen(port, () => {
    console.log(`El servidor está inicializado en el puerto http://localhost:${port}`);
  });

  //Midleware

app.use(express.static("public"));
app.use(express.static("assets"));


  app.get("/", (req, res) => {
    res.sendFile("/index.html");
  });

  app.get("/cargarimg", async (req, res) => {
    const nombreImg = `img${uuidv4().slice(0, 6)}.jpg`
    const { imagen } = req.query;
    const imgJimp = await jimp.read(imagen);
    await imgJimp
      .resize(350, jimp.AUTO)
      .grayscale()
      .writeAsync(`assets/img/${nombreImg}.jpg`);
    res.sendFile(path.join(__dirname + `/assets/img/${nombreImg}.jpg`));
  });