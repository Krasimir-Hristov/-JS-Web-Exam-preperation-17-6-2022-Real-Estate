const houseService = require('../services/houseService');


function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;

        if (populate) {
            res.locals.house = await houseService.getHousesAndUsers(id);
        } else {
            res.locals.house = await houseService.getHouseById(id);
        }

        next();
    };
}

module.exports = preload;
