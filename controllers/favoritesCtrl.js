const { addFavorites, getFavorites } = require('../services/favoritesService')

const add = async (req, res) => {
    try {
        const favorite = req.body;
        const { statusHttp, response } = await addFavorites(favorite);
        res.status(statusHttp).json({ response });
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAll = async (req, res) => {
    try {
        // const { id } = req.body; // const id = req.body.id
        const { statusHttp, response } = await getFavorites(req.payload.id);
        res.status(statusHttp).json({ response });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    add,
    getAll
}