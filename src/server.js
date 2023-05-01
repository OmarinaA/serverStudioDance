const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../model/model");
const PORT = process.env.PORT || 8081;
const auth = require('../routes/auth.routes');

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get("/", (req, res) => {
    res.json({
        message: "Домашняя страница. Бэк работает"
    });
});
db.sequelize.sync();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


app.use("/auth", auth)


