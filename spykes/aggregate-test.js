require('./../connection/mongoconn');
const mongoose = require("mongoose");
const FavoriteModel = require('./../models/favoriteModel');
const {ObjectId} = mongoose.Types;

const main = async (id) =>{
    try{ 
        const favoritesByUser = await FavoriteModel.aggregate([
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
                        property: '$property',                        
                    }
                }
            ]
        );
        console.log(favoritesByUser);
     /*    if (favoritesByUser.length > 0) {
           return responseOk({ favoritesByUser });
         }
         return responseError(404, 'propiedades no encontradas para el usuario: '+ id); */

    } catch (error){
        console.log('error' error)
    }
}

main ("")