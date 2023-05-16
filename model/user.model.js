module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
    username: {
    type: Sequelize.STRING
    },
    login: {
        type: Sequelize.STRING
        },
    phone: {
        type: Sequelize.STRING
        },
    email: {
    type: Sequelize.STRING
    },
    password: {
    type: Sequelize.STRING
    }
    // activated: {
    //     type: Sequelize.BOOLEAN, default: false
    // },
    // activationLink:{
    //     type: Sequelize.STRING
    // }
    });
    return User;
    };
    