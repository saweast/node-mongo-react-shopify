var models = require('../../sequelize/models');

const uninstall = async (shop) => {
  const updatedShop = await models.Shop.update(
    { active: false, webhooksSet: false },
    { where: { url: shop } },
  ).catch((err) => {
    throw err;
  });

  return updatedShop;
};

module.exports = {
  uninstall,
};
