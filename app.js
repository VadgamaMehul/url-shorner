const express = require("express");
const { default: mongoose } = require("mongoose");
const url_shortner_db = require("./Model/url_shortner_db");
const { configDotenv } = require("dotenv");
const router = require("./Routes/url_shortner_route");

configDotenv();

//PORT
const PORT = process.env.PORT || 3000
const app = express()


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('connected to MongoDB'))
.catch((err)=>console.error(err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // for parsing application/json
app.use(router);



//Listen
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))