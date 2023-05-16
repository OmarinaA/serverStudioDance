const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../model/model");
const PORT = process.env.PORT || 8081;
const auth = require('../routes/auth.routes');
const photo = require('../controller/file.controller');

const productController = require('../controller/product.controller');
// const MailService = require("./service/mail/mailer.service")

const app = express();
app.use(cors({
    origin: '*'
}));
require('dotenv').config();
// const { vKAuthFirstStep, vkLoginComplete } = require('./vk-auth');
// app.get('/', (req, res) => res.send('Hello World!'));
app.get('/login/vk', (req, res) => vKAuthFirstStep(res));
// app.get('/login/vk/complete', vkLoginComplete);
app.get('/products', productController.getAll);
app.post('/products', productController.create);
app.use(express.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.get("/", (req, res) => {
    res.json({
        message: "Домашняя страница. Бэк работает"
    });
});
db.sequelize.sync();

// MailService.sendTestMail('omelchenko_marina@internet.ru');


app.use("/auth", auth);
app.use("/photo", photo);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});



