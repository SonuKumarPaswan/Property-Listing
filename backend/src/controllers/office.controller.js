const { cloudinary } = require("../config/cloudinary");
const slugify = require("slugify");
const { Office } = require("../models/office");


module.exports.createOffice = (req, res) => {
    console.log(req.body);
    try {
        const office= await Office.create({

        })


    } catch (error) {
        console.log(error)
    }
}

