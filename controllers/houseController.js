const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createHouse, getAllHouses, u, updateHouse, deleteHouse } = require('../services/houseService');
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

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Page' });
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;

    const house = {
        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        description: req.body.description,
        availablePieces: req.body.availablePieces
    }

    try {
        await updateHouse(id, house);
        res.redirect('/catalog/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        trip._id = id;
        res.render('edit', {title: 'Edit Trip',  trip, errors });
    }
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deleteHouse(req.params.id);
    res.redirect('/catalog');     
});







module.exports = router;         