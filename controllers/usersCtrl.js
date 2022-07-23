const { auth, register, infoUser } = require('../services/usersService')

const login = async (req, res) => {
    try {
        const user = req.body;
        const { statusHttp, response } = await auth(user.email, user.password);
        res.status(statusHttp).json({ response });
    } catch (error) {
        res.status(500).send(error);
    }
};

const getUser = async (req, res) => {
    try {
        // const { id } = req.body; // const id = req.body.id
        const { statusHttp, response } = await infoUser(req.payload.id);
        res.status(statusHttp).json({ response });
    } catch (error) {
        res.status(500).send(error);
    }
};

const signup = async (req, res) => {
    try {
        const user = req.body;
        const { statusHttp, response } = await register(user);
        res.status(statusHttp).json({ response });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    login,
    signup,
    getUser
}