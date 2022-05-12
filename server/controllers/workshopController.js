const Workshop = require("../models/workshop");
const { workshopValidation } = require("../functions/workshopValidation");

// Functions:
// workshop_create, workshop_find, workshop_update, workshop_remove

const workshop_create = async (req, res) => {
    let workshopToAdd = req.body;
    
    // Making sure data received for the workshop is valid:
    const { error } = workshopValidation(workshopToAdd);
    if (error) {
        console.log("Workshop data is not valid");
        return res.status(400).json(error);
    }

    // Making sure there won't be duplicates:
    let find_workshop_name = await Workshop.exists({ name: workshopToAdd.name });
    let find_workshop_date = await Workshop.exists({ date: workshopToAdd.date });
    if (find_workshop_name || find_workshop_date) {
        return res.status(400).json("That workshop exists already.");
    }

    // If everything is ok, then add the workshop to the db:
    console.log("...adding workshop to db");
    const workshop = new Workshop({
        "name": workshopToAdd.name,
        video_url: workshopToAdd.video_url,
        banner_url: workshopToAdd.banner_url,
        description: workshopToAdd.description,
        date: workshopToAdd.date,
        academic_year: workshopToAdd.academic_year
    });

    workshop.save()
        .then((result) => {
            console.log("...workshop added to db");
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
};

workshop_find = async (req, res) => {
    // Check if there was a specific academic year specified:
    const { ay } = req.query;

    // If specific academic year specified, retrieve all relevant workshops.
    if (ay) {
        Workshop.find({ academic_year: ay })
            .then((result) => {
                return res.status(200).send(result);
            })
            .catch((err) => {
                return res.status(400).send(err);
            });
    }
    // Otherwise, retrieve all workshops.
    else {
        Workshop.find()
            .then((result) => {
                return res.status(200).send(result);
            })
            .catch((err) => {
                return res.status(400).send(err);
            });
    }
};

const workshop_update = async (req, res) => {
    // Check whether the workshop exists in the db:
    Workshop.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then((result) => {
            res.status(200).send({ msg: "Workshop updated!", body: result });
        })
        .catch((err) => {
            console.log("...could not update workshop");
            return res.status(400).send(err);
        });
};

const workshop_remove = async (req, res) => {
    let workshopsToDelete = req.body.workshopsToDelete;
    
    console.log("...deleting workshops");
    Workshop.deleteMany({
        _id: { $in: workshopsToDelete}
    })
        .then((result) => {
            console.log("...workshops were deleted")
            return res.status(200).json({
                msg: "Workshop(s) deleted!",
                body: result,
            });
        })
        .catch((err) => {
            console.log("...could not delete workshops");
            return res.status(400).json({ msg: "Workshops could not be deleted!", error: err });
        });
}

module.exports = {
    workshop_create,
    workshop_find,
    workshop_update,
    workshop_remove
}