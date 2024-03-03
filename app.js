const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");

const pets = require("./routes/pets.js");
const type = require("./routes/type.js");
const breed = require("./routes/breed.js");

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/pets", pets);
app.use("/type", type);
app.use("/breed", breed);
app.use("/export", pets);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@pets.1qazijy.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((result) => {
    const io = require("./socket.js").init(
      app.listen(process.env.PORT || 5000)
    );
    io.on("connect", (socket) => {
      socket.on("disconnect", () => {});
    });
  })
  .catch((err) => console.log(err));
