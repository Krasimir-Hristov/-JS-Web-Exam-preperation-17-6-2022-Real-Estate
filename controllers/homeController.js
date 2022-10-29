const { getAllHouses } = require('../services/houseService');


const router = require('express').Router();




router.get('/', (req, res) => {
    res.render('home');
});

router.get('/catalog', async (req, res) => {
    const houses = await getAllHouses();
    res.render('catalog', { title: 'All Houses',  houses });
});



module.exports = router