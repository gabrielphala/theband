if (process.env.NODE_ENV != 'production')
    require('dotenv').config();

const express = require('express');
const config = require('./src/config');
const loaders = require('./src/loaders');

(async () => {
    if (Date.now() < (new Date(2023, 10, 4)).getTime()) {
        const app = express();
        const router = express.Router();

        loaders(app, router);

        app.use(express.static('public'));

        app.listen(config.env.port, () => {
            console.log(`Running on port: ${config.env.port}`);
        });
    }
})();
