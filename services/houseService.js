const House = require('../models/Houses');

async function createHouse(house) {
    const result = new House(house);
    await result.save();
}

async function getAllHouses(search) {
    const query = {};

    if (search) {
        query.type = new RegExp(search, 'i');
    }
    return House.find(query).lean();
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

async function updateHouse(id, house) {
    const existing = await House.findById(id);

     existing.name = house.name;
     existing.type = house.type;
     existing.year = Number(house.year);
     existing.city = house.city;
     existing.description = house.description;  
     existing.availablePieces = house.availablePieces;

   

     await existing.save();
}

async function deleteHouse(id) {
    await House.findByIdAndDelete(id);
}

async function rentHouse(houseId, userId) {
    const house = await House.findById(houseId);

    if(house.renters.includes(userId)) {
        throw new Error('You already share this publication');
    }

    house.renters.push(userId);
    await house.save();
}

async function getAllByDate(search) {


}

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
    getHouseById,
    updateHouse,
    deleteHouse,
    rentHouse
}
