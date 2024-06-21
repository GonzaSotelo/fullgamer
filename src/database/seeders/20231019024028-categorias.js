'use strict';
const categoriesJSON = require('../../data/categories.json')

const categories = categoriesJSON.map(({ name, image, image2, image3, image4, image5, banner, parrafo }) => {
  return {
    name,
    image,
    image2,
    image3,
    image4,
    image5,
    banner,
    parrafo,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('Categories', categories, {});//primer valor es nombre de tabla, segundo valor es con los datos q se llena la tabla en este caso la const categorie

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
