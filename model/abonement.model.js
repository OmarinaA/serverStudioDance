module.exports = (sequelize, Sequelize) => {
    const Subscriptions = sequelize.define("Subscriptions", {
    Title: {
    type: Sequelize.STRING
    },
    Services: {
    type: Sequelize.STRING
    },
    Price: {
    type: Sequelize.INTEGER
    }
    });
    return Subscriptions;
    };
    