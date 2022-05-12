const Joi = require('@hapi/joi');

// Workshop Validation
const workshopValidation = data => {
    const schema = Joi.object({
        name: Joi.string().required(),
        video_url: Joi.string().uri().required(),
        banner_url: Joi.string().uri().required(),
        description: Joi.string().required(),
        date: Joi.date().required(),
        academic_year: Joi.string().required()
    });

    return schema.validate(data);
}

module.exports.workshopValidation = workshopValidation;
