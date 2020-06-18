module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Tag', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        companyId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      }, { transaction });

      // index to search by name for given user
      await queryInterface.addIndex('Tag', { transaction, fields: ['companyId', 'name'], type: 'UNIQUE' });
      // index to speed up join operations and filter by userId
      await queryInterface.addIndex('Tag', { transaction, fields: ['companyId'] });

      await queryInterface.createTable('CompositeTag', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        tagId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        compositeId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        unpricedIdentifier: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      }, { transaction });

      await queryInterface.addIndex('CompositeTag', { transaction, fields: ['tagId'] });
      await queryInterface.addIndex('CompositeTag', { transaction, fields: ['compositeId'] });
      await queryInterface.addIndex('CompositeTag', { transaction, fields: ['unpricedIdentifier'] });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();

      throw e; // to fail migration
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable('Tag', { transaction });
      await queryInterface.dropTable('CompositeTag', { transaction });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();

      throw e; // to fail migration
    }
  }
};
