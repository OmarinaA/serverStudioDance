module.exports = (sequelize, Sequelize) => {
    const Photo = sequelize.define("photo", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        photoPath: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        }
    });
    return Photo;
};