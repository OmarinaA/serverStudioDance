module.exports = (sequelize, Sequelize) => {
    const Teachers = sequelize.define("teachers", {
        FIO: {
            type: Sequelize.STRING
        },
        Experiens: {
            type: Sequelize.STRING
        },
        Direction: {
            type: Sequelize.STRING
        },
        Phone: {
            type: Sequelize.STRING
        }
    });
    return Teachers;
};
