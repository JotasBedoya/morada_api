const mongoose = require('mongoose'); // se importa el orm mongoose
const { Schema } = mongoose;

const PropertySchema = new Schema(
    {
        title: String,
        city: Number,
        zona: Number,
        propertyType: Number,
        businessType: Number,
        mainImage: String,
        images: [String],
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        value: Number,
        shortDescription: String,
        description: String,
        status: Number
    },
    {
        timestamps: true
    }
);

const Property = mongoose.model('properties', PropertySchema);

module.exports = Property;