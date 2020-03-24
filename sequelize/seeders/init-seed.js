module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('shops', [{
      url: 'testapp.myshopify.com',
      name: 'testapp',
      token: 'SHOPIFYTOKEKNN',
      webhooks_set: true,
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },
};
