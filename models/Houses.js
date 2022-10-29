const { Schema, model, Types: { ObjectId } } = require('mongoose');


//const URL_PATTERN = /^https?:\/\/(.+)/;


const houseSchema = new Schema({
    name: { type: String, required: true, minlength: [6, 'Name should be at least 6 characters long'] },
    type: { type: String, required: true, enum: ['Apartment', 'Villa', 'House'] },
    year: { type: Number, required: true, min: 1850, max: 2021 },
    city: { type: String, required: true, minlength: [4, 'City should be at least 4 characters long'] },
    houseImg: { type: String, required: true },
    availablePieces: { type: Number, required: true, min: 0, max: 10},
    description: { type: String, required: true, maxlength: [60, 'Descripion should be maximal 60 characters long'] },
    owner: { type: ObjectId, ref: 'User', required: true },
    renters: { type: [ObjectId], ref: 'User', default: [] },
});

const House = model('House', houseSchema);

module.exports = House; 