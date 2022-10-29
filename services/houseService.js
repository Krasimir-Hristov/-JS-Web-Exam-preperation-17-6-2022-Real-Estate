const House = require('../models/Houses');

async function createHouse(house) {
    const result = new House(house);
    await result.save();
}

async function getAllHouses() {
    return House.find({}).lean();
}


async function getRecent() {
    return House.find({}).sort({ userCount: -1 }).limit(3).lean();
}

async function getHousesAndUsers(id) {
    return House.findById(id).populate('renters').populate('owner').lean();
}

async function getHouseById(id) {
    return House.findById(id).lean();
}

// async function updatePublication(id, publication) {
//     const existing = await Publication.findById(id);

//      existing.title = publication.title;
//      existing.technique = publication.technique;
//      existing.picture = publication.picture;
//      existing.certificate = publication.certificate;

//      await existing.save();
// }

// async function deletePublication(id) {
//     await Publication.findByIdAndDelete(id);
// }

// async function sharePublication(publicationId, userId) {
//     const publication = await Publication.findById(publicationId);

//     if(publication.usersShared.includes(userId)) {
//         throw new Error('You already share this publication');
//     }

//     publication.usersShared.push(userId);
//     await publication.save();
// }

// async function getPublicationsByUser(userId) {
//     return Publication.find({ author: userId }).lean();
// }

// async function getSharesByUser(userId) {
//     return Publication.find({ usersShared: userId }).lean();
// }


module.exports = {
    createHouse,
    getAllHouses,
    getRecent,
    getHousesAndUsers,
    getHouseById
}
