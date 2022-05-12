const express = require("express");
const workshopController = require("../../controllers/workshopController");

// Create express router object:
const workshopsRouter = express.Router();

// Route to retrieve all workshops or specific workshops from the db:
workshopsRouter.get("/", workshopController.workshop_find);

// Route to add a workshop to the db:
// Request body will have a json with the workshop data
workshopsRouter.post("/", workshopController.workshop_create);

// Route to edit data for a particular workshop:
// ID of a workshop is included in the route and the data to change
// is received in the request body.
workshopsRouter.put("/:id", workshopController.workshop_update);

// Route to delete workshops from the db:
// The IDs of workshops to delete is received in
// the request body.
workshopsRouter.delete("/", workshopController.workshop_remove);

module.exports = workshopsRouter;
