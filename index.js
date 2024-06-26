const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/errorHandler");

// load env configs
dotenv.config({ path: "./config/config.env" });

const app = express();

// route files

// body pharser
app.use(express.json());
app.use(cors());

// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// mount routers

// error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const Server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.underline);
  // close server and exit process
  Server.close(() => process.exit(1));
});
