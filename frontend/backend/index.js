const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const db = require("./config/db");
const product = require("./routes/product");
const user = require("./routes/user");
const cloudinary = require("cloudinary").v2;

dotenv.config();

// dotenv.config'den sonra cloudinary.config çağrısı
cloudinary.config({ 
  cloud_name: '***************', 
  api_key: '*************', 
  api_secret: '***********' 
});

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/", product);
app.use("/", user);

db();

const PORT = 4000;
app.listen(PORT, () => {
  console.log("server is running on 4000 port");
});
