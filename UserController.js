const databaseConfig = require('./config/knexfile'); //относительный путь к файлу настроек
var knex = require('knex')(databaseConfig);
const express = require('express'); //Импорт модуля express
const app = express(); //объявление express приложения
app.use(express.json())
const port = 8081; //порт, на котором будет работать приложение
const uuid = require('uuid').v4;

app.get("/users", async (req, res) => {
    const UsersList = await knex
    .select("*")
    .from("Users")
    res.json(UsersList);
   });


   app.get("/users/:UserID", async (req, res) => {
const UsersList = await knex
.select("*")
.from("Users")
.where("UserID",req.params.UserID)
res.json(UsersList);
});




app.post("/users", (req, res) => {
    console.log(req.body)
    const id = uuid();
    knex("Users").insert(
    {   UserID: uuid(),
        FIO: req.body.FIO,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Login: req.body.Login,
        Password: req.body.Password,
        Role: req.body.Role})
    .then(() => {res.json({message: "Успешно добавлен пользователь"});})
    .catch(err => {res.json({message: "Произошла ошибка", error: err});})
    });



app.put('/users/:UserID', async (req, res)=> {
    const UserID = req.params.UserID;
    const{FIO, Phone, Email, Login, Password, Role} = req.body
    knex.select('*')
        .from('Users')
        .where('UserID', UserID)
        .update({
            FIO: FIO, Phone: Phone, Email: Email, Login: Login, Password: Password, Role: Role
        })
        .orderBy("id")
    .then(() => {res.json({message: "Успешно обновлен пользователь"});})
    .catch(err => {res.json({message: "Произошла ошибка", error: err});})
});

app.delete("/users/:UserID", (req, res) => {
    console.log(req.params)
    const UserID = req.params.UserID;
    knex("Users")
    .where("UserID", UserID)
    .del()
    .then(() => res.json({message: "Пользователь успешно удалён"}));
});


   


app.listen(port, () => { //Запуск приложения. Веб-сервер начинает прослушивать указанный порт
     console.log(`Example app listening at http://localhost:${port}`)
})