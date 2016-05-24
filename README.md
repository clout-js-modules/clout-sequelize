clout-sequelize
==================
## Install
In the directory of your clout-js application, do the following;

1) Install this package
```bash
npm install clout-sequelize
```

2) Add this module to ```package.json```
```JSON
{
    ...
    "modules": ["clout-sequelize"]
    ...
}
```

## Configure
Create a new file ```sequelize.default.js``` or ```sequelize.<YOUR_ENV>.js``` in ```/conf``` directory with the following JavaScript.
```JavaScript
module.exports = {
    sequelize: {
        database: '<DATABASE>',
        username: '<USERNAME>',
        password: '<PASSWORD>',
        connection: {
            host : '<HOSTNAME>',
            dialect: 'mysql',
            dialectOptions: {
                multipleStatements: true
            },
            logging: false
        },
        sync: false
    }
};
```

## Usage
Place models within ```/models``` in your application directory. A sequalize instance will be available within the clout-js scope. e.g. ```/models/Cart.js```

```JavaScript
const
    clout = require('clout-js'),
    Sequelize = clout.Sequelize,
    sequelize = clout.sequelize;

// Refer to the sequelize documentation
var props = {};
var Cart = sequelize.define('Cart', {
    quantity: { type: Sequelize.INTEGER, allowNull: false, default: 1 }
}, props);

// Relationships
// Cart.belongsTo(Item,        { foreignKey: 'itemId' });
// Cart.belongsTo(User,        { foreignKey: 'userId' });

// Extend static functions
Cart.staticFunction = function () {

}

module.exports = Cart;
```


