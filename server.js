/// Environment Outter Scope here -
const mongoose = require('mongoose');
require('dotenv').config({ path: `${__dirname}/.env` });

process.on('uncaughtException', (err) => {
  console.log('UNHANDLER EXCEPTION : Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // .connect(process.env.DATABASE_LOCAL,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log('DB connection successful!');
  });

// START THE SERVER
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION : Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

// const dotenv = require('dotenv');
// console.log(process.env.PORT);
// dotenv.config({ path: './.env' });
// const dotenv = require('dotenv').config({ path: './config.env' });

// console.log(process.env);

// const testTour = new Tour({
//   name: 'The Park Camper',
//   // rating: 4.7,
//   price: 497,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR : ', err);
//   });
