const Sequelize = require('sequelize');
const conn = new Sequelize (process.env.DATABASE_URL || 'postgres://localhost/reduxProducts')

const Product = conn.define ('User', {

    name : {
        type: Sequelize.STRING,
        validate: {
            notNull: false,
            notEmpty: true
        }
    },

    id : {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    }

});

const syncAndSeed = async() => {
    await conn.sync({force: true});
    const products = ['Poopies', 'Party Parrots', 'Coffee', 'Toilets'];
    await Promise.all(products.map(item => {Product.create({name: item})}));
}

syncAndSeed();

module.exports = {
    syncAndSeed,
    Product
}