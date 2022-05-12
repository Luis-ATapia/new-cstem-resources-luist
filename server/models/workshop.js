const mongoose = require("mongoose");
require("mongoose-type-url");
const Schema = mongoose.Schema;


const workshopSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    video_url: {
        type: mongoose.SchemaTypes.Url,
        required: true,
    },
    banner_url: {
        type: mongoose.SchemaTypes.Url,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    academic_year: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Workshop = mongoose.model('Workshop', workshopSchema);
module.exports = Workshop;
