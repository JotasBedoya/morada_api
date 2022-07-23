const favoriteModel = require("./../models/favoriteModel");
const responseOk = require('../utils/responseOk');
const responseError = require('../utils/responseError');
const jwt = require('jsonwebtoken');
// var ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
const {ObjectId} = mongoose.Types;

const addFavorites = async (favoriteData) => {
    try {
        const favorite = new favoriteModel(favoriteData);
        await favorite.save();
        return responseOk({ favorite });
    } catch (error) {
        // console.log(error);
        return responseError(500, 'ocurrio un error');
    }
};

const getFavorites = async (id) => {
    try {
        // const userProperties = await favoriteModel.find({ userId: id });
        // if (userProperties) {
        //     return responseOk({ userProperties });
        // }
        // return responseError(404, 'propiedades no encontradas para el usuario: ', userProperties.id);
        // console.log(id);
        const favoritesByUser = await favoriteModel.aggregate(
            [
                {
                    $match: {
                        userId: ObjectId(id)
                    }
                },
                {
                    $lookup: {
                      from: 'users',
                      localField: 'userId',
                      foreignField: '_id',
                      as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $lookup: {
                      from: 'properties',
                      localField: 'propertyId',
                      foreignField: '_id',
                      as: 'property'
                    }
                },
                {
                    $unwind: '$property'
                },
                {
                    $project: {
                        userId: '$user._id', 
                        name: '$user.name', 
                        email: '$user.email', 
                        phone: '$user.phone', 
                        propertyId: '$property._id', 
                        title: '$property.title', 
                        value: '$property.value'                         
                    }
                }
            ]
        );
        // console.log(favoritesByUser);
        if (favoritesByUser.length > 0) {
            return responseOk({ favoritesByUser });
        }
        return responseError(404, 'propiedades no encontradas para el usuario: '+ id);

    } catch (error) {
        // console.log(error);
        return responseError(500, 'ocurrio un error');
    }
};

module.exports = {
    addFavorites,
    getFavorites
}