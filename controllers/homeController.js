const preload = require('../middleware/preload');
const { getAllHouses, getRecent } = require('../services/houseService');


const router = require('express').Router();




router.get('/', async (req, res) => {
    const houses = await getRecent()

    res.render('home', {
        title: 'Home Page',
        houses
    });
});

router.get('/catalog', async (req, res) => {
    const houses = await getAllHouses();
    res.render('catalog', { title: 'All Houses',  houses });
});

router.get('/catalog/:id', preload(true), (req, res) => {
    const house = res.locals.house;
    house.remainingPieces = house.availablePieces - house.renters.length;
    house.rentersList = house.renters.map(r => r.fullName).join(', ');
    if (req.session.user) {
        house.hasUser = true;
        house.isOwner = req.session.user._id == house.owner._id;

        if (house.renters.some(r => r._id == req.session.user._id)) {
            house.isJoined = true;
        }
    }

    res.render('details', { title: 'Details Page' });
})



module.exports = router;