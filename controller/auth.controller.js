const db = require("../model/model");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
    console.log(req.body)
    User.create({
            username: req.body.username.username,
            phone: req.body.username.phone,
            login: req.body.username.login,
            email: req.body.username.email,
            password: bcrypt.hashSync(req.body.username.password, 8)
        })
        .then(user => {  

            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        User.findOne({
                                where: {
                                    username: req.body.username.username
                                }
                            })
                            .then(user => {
                                var token = jwt.sign({
                                    id: user.id
                                }, config.secret, {
                                    expiresIn: 86400 // 24 часа
                                });
                                var authorities = []; 
                                user.getRoles().then(roles => {
                                    for (let i = 0; i < roles.length; i++) {
                                        authorities.push("ROLE_" + roles[i].name.toUpperCase());
                                    }
                                    console.log('kjhg')
                                    res.status(200).send({
                                        status:200,
                                        id: user.id,
                                        username: user.username,
                                        email: user.email,
                                        roles: authorities,
                                        accessToken: token
                                        
                                    });
                                });
                            })
                        
                    });
                });
            } else {
                user.setRoles([1]).then(() => {
                    res.send({
                        message: "User was registered successfully!"
                    });
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};
exports.signin = (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "Пользователя не существует"
                });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            var token = jwt.sign({
                id: user.id
            }, config.secret, {
                expiresIn: 86400 // 24 часа
            });
            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
               res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
                message: 
                concole.log(err.message)
            res.status(500).send({
                message: err.message
            });
        });
};

exports.fetchUsers = (req, res) => {
    User.findAll()
        .then(users => {
               res.status(200).send(users)
        })
        .catch(err => {
                message: 
                concole.log(err.message)
            res.status(500).send({
                message: err.message
            });
        });
};

exports.changePassword = async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;
    try {
        // Проверяем, что старый пароль введен верно
        const user = await db.user.findByPk(userId);
        const passwordIsValid = await user.checkPassword(oldPassword);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Неверный старый пароль' });
        }

        // Изменяем пароль и сохраняем пользователя
        user.password = await bcrypt.hash(newPassword, 8);
        await user.save();

        res.send({ message: 'Пароль успешно изменен' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Ошибка сервера' });
    }
};