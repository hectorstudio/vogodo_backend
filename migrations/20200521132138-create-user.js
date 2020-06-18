module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      workPhone: {
        type: Sequelize.STRING,
      },
      mobilePhone: {
        type: Sequelize.STRING,
      },
      profilePictureUrl: {
        type: Sequelize.STRING,
      },
      linkedinProfileUrl: {
        type: Sequelize.STRING,
      },
      userType: {
        type: Sequelize.STRING,
      },
      defaultCurrency: {
        type: Sequelize.STRING,
      },
      createdTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      passwordLastChanged: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('User');
  }
};
