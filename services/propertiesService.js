const PropertyModel = require("./../models/propertyModel");
const responseOk = require('../utils/responseOk');
const responseError = require('../utils/responseError');
const Property = require("./../models/propertyModel");

const getProperties = async (filter) => {
    try {
        const query = buildQueryFilter(filter);
        // console.log('filter', filter);
        const properties = await PropertyModel.find(query);
        return responseOk({ properties });
    } catch (error) {
        return responseError(500, 'Server error');

    }
};

const buildQueryFilter = (filter) => {
    const query = {};
    if (filter.city) query.city = Number(filter.city);
    if (filter.zone) query.zone = Number(filter.zone);
    if (filter.propertyType) query.propertyType = Number(filter.propertyType);
    if (filter.businessType) query.businessType = Number(filter.businessType);
    if (filter.status) query.status = Number(filter.status);
    if (filter.minPrice && filter.maxPrice) {
        query.value = {
            '$gte': Number(filter.minPrice),
            '$lte': Number(filter.maxPrice)
        }
    }
    return query;
};

const getProperty = async (id) => {
    try {
        const property = await PropertyModel.findById(id)
                        .populate("ownerId","name email phone")
                        .exec();
        if (property) {
        return responseOk({ property });
        }
        return responseError(404, 'property not found');

    } catch (error) {
        return responseError(500, 'Server error');
    }
};

const addProperty = async (propertyData) => {
    try {
        const property = new PropertyModel(propertyData);
        await property.save();
        return responseOk({ property });
    } catch (error) {
        // console.log(error);
        return responseError(500, 'Server error');
    }
};

const removeProperty = async (id) => {
    try {
        const property = await PropertyModel.findById(id);
        // console.log('property', property);
        if(property){
            await property.remove();
            return responseOk({ property });
        }
        return responseError(404, 'property not found');
    } catch (error) {
        return responseError(500, 'Server error');
    }
};

module.exports = {
    getProperties,
    getProperty,
    addProperty,
    removeProperty
}