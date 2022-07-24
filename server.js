const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.use(express.json()); //json format
app.use(express.urlencoded({ extended: true })); //url format

app.get("/", (req, res) => {
  res.json({
    message: "Welcome To Strands Energy",
  });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
//export router file

var device = require("./routers/electronic_device_details");
device(app);

const db = require("./models/index");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
