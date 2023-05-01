const {
    verifySignUp
} = require("../middleware/index");
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
router.post("/signin", controller.signin);
module.exports = router;