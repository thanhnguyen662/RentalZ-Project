const rentalRoute = require('./rental');

const route = (app) => {
   app.use('/rental', rentalRoute);
};

module.exports = route;
