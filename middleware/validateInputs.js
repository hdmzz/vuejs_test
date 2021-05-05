const Joi = require('joi-plus'); //https://www.npmjs.com/package/joi-plus
//Validation des inputs utilisateurs coté back
const schema = Joi.object({
	firstName: Joi.string().alpha().required(),// Alpha uniquement des lettres pas de chiffres
    lastName: Joi.string().alpha().required(), 
    email: Joi.string().email().required(),
    password: 
    Joi.string().password({
        min: 8,
        max: 120,
        lowercase: true, 
        uppercase: true,
        number: true,
        special: true, // caractère spécial
        count: 3// au moins trois des conditions ci dessus
    }).required()
})

exports.newUser = (req, res, next) => {
    console.log(req.body)
    const {error, value} = schema.validate({
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
    if(error){
        res.status(422).json({error})
    } else {
        next()
    }
}