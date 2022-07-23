const mongoose = require('mongoose'); // se importa el orm mongoose
const { Schema } = mongoose;

const FavoriteSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        propertyId: {
            type: Schema.Types.ObjectId,
            ref: 'properties'
        }
    },
    {
        timestamps: true
    }
);

const Favorite = mongoose.model('favorites', FavoriteSchema);

module.exports = Favorite;