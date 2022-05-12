const express = require("express");

// Create express router object:
const mainRouter = express.Router();

mainRouter.use("/workshops", require("./resourceRoutes/workshopRoutes"));

module.exports = mainRouter;
