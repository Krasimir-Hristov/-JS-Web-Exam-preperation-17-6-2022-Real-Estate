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



module.exports = router