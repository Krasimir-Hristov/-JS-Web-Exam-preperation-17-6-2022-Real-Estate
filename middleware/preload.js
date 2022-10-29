//TODO replace with actual service;
const collectionService = {};


function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;

        if (populate) {
            
            //TODO make it work 
            res.locals.publication = await publicationService.getPublicationsAndUsers(id);
            
            //TODO make it work 
        } else {
            res.locals.publication = await publicationService.getPublicationById(id);
        }

        next();
    };
}

module.exports = preload;
