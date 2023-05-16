module.exports = (sequelize, Sequelize) => {
    const Directions = sequelize.define("directions", {
        Title: {
            type: Sequelize.STRING
        },
        Description: {
            type: Sequelize.STRING
        }
    });
    return Directions;
};
