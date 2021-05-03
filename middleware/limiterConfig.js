const rateLimit = require('express-rate-limit');

exports.limiterConfig = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minutes
    max: 50 // 50 requete
});