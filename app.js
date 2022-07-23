const express = require('express');
const app = express();
const mongo = require('./connection/mongoconn');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))//resuelve caracteres especiales en las urls
app.use('/static', express.static('public'));
const port = 3001;

const usersRoutes = require('./routes/users');
const propertiesRoutes = require('./routes/properties');
const favoritesRoutes = require('./routes/favorites');
app.use('/users', usersRoutes);
app.use('/properties', propertiesRoutes);
app.use('/favorites', favoritesRoutes);

app.listen(port, () => {
    console.log('server running');
});