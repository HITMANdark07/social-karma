import Joi from 'joi';

export const createFoodDonationValidator = (req, res, next) => {
    
    const locationSchema = Joi.object({
        lat: Joi.number().required(),
        lng: Joi.number().required()
    })
    const foodDonationSchema  = Joi.object({
        donator:Joi.string().required(),
        location:locationSchema,
        foodDesc:Joi.string().required(),
        contact:Joi.string().required(),
        foodWeight:Joi.number().required(),
        expectedExpiry:Joi.date().required()
    })

    const { error } = foodDonationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.message
        });
    }
    next();
}