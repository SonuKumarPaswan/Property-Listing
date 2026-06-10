const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
         description: {
            type: String,
            required: true,
        },
        propertyType: {
            type: String,
            enum: "office space",
            required: true,
            default: "office space",
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
       
        price: {
            type: Number,
            required: true,
        },
        rentalPeriod: {
            type: String,
            enum: ["per_month", "total"],
            required: true,
        },
        area: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        amenities: {
            type: [String],
            enum: ['24/7 Security', 'Elevator', 'Fireplace', 'Smart Home', 'Terrace'],
        },

        images: {
            url: { type: String },
            public_id: { type: String },
        },

    }
)

const Office = new mongoose.model("Office", officeSchema);

module.exports = {Office};






