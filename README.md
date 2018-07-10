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
const clout = require('clout-js');
const { Sequelize, sequelize } = clout;

// Refer to the sequelize documentation
var props = {
    classMethods: {
        // custom hook for adding associations to models
        associate(models) {
            models.Cart.belongsTo(Item, { foreignKey: 'itemId' });
            models.Cart.belongsTo(User, { foreignKey: 'userId' });
        }
    }
};

var Cart = sequelize.define('Cart', {
    quantity: { type: Sequelize.INTEGER, allowNull: false, default: 1 }
}, props);

// Extend static functions
Cart.staticFunction = function () {

}

module.exports = Cart;
```


