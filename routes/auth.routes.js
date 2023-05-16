const { verifySignUp } = require("../middleware/index");
const express = require("express");
const controller = require("../controller/auth.controller");
const router = express.Router();
router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept, Authorization"
    );
    console.log(req.params)
    next();
});
router.post(
    "/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
);
router.get("/takeUsers", controller.fetchUsers);
router.post("/signin", controller.signin);
router.post("/change-password", async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    try {
        // Проверяем, что старый пароль введен верно
        const user = await User.findByPk(userId);
        const passwordIsValid = await user.validatePassword(oldPassword);
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Неверный старый пароль" });
        }

        // Изменяем пароль и сохраняем пользователя
        user.password = await bcrypt.hash(newPassword, 8);
        await user.save();

        res.send({ message: "Пароль успешно изменен" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Ошибка сервера" });
    }
});

module.exports = router;
