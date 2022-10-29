const { isUser } = require('../middleware/guards');
const { createHouse, getAllHouses } = require('../services/houseService');
const mapErrors = require('../util/mappers');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create House', data: {} });
});

router.post('/create', isUser(), async (req, res) => {
    const house = {
        name: req.body.name,
        type: req.body.type,
        houseImg: req.body.houseImg,
        city: req.body.city,
        year: Number(req.body.year),
        availablePieces: Number(req.body.availablePieces),
        description: req.body.description,
        owner: req.session.user._id
    };

    try {
        await createHouse(house);

        res.redirect('/catalog');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', {title: 'Create House',  data: house, errors });
    }

});






module.exports = router;