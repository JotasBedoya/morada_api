const mongoose = require('mongoose'); // se importa el orm mongoose
const { Schema } = mongoose;

const RequestSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        propertyId: {
            type: Schema.Types.ObjectId,
            ref: 'properties'
        },
        comment: String
    },
    {
        timestamps: true
    }
);

const Request = mongoose.model('requests', RequestSchema);

module.exports = Request;