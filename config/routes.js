const authController = require('../controllers/auth');
const houseController = require('../controllers/houseController');
const homeController = require('../controllers/homeController');

module.exports = (app) => {
    app.use(authController);
    app.use(houseController);
    app.use(homeController);

    app.get('*', (req, res) => {
            res.render('404', { title: 'Page Not Found' });
        });
}