const UserModel = require("./../models/userModel");
const responseOk = require('../utils/responseOk');
const responseError = require('../utils/responseError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (userData) => {
    try {
        if (await validateEmail(userData.email)) {
            return responseError(400, 'email is alredy used');
        }
        const passwordEncrypted = await bcrypt.hash(userData.password, 11);
        userData.password = passwordEncrypted;
        const user = new UserModel(userData);
        await user.save();
        return responseOk({ user });
    } catch (error) {
        console.log(error);
        return responseError(500, 'ocurrio un error');
    }
};

const validateEmail = async (email) => {
    try {
        const checkEmail = await UserModel.findOne({ email: email })
        return checkEmail ? true : false;
    } catch (error) {
        return responseError(500, 'ocurrio un error');
    }
}

const auth = async (email, password) => {
    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const payload = {
                    id: user._id,
                    role: user.role
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET)
                return responseOk({ token, role: user.role });
            }
        }
        return responseError(401, 'usuario no autenticado');
    } catch (error) {
        return responseError(500, 'ocurrio un error');
    }
};

const infoUser = async (id) => {
    try {
        const user = await UserModel.findById(id);
        if (user) {
            return responseOk({ user });
        }
        return responseError(404, 'usuario no encontrado');
    } catch (error) {
        return responseError(500, 'ocurrio un error');
    }
}

module.exports = {
    auth,
    register,
    infoUser
}