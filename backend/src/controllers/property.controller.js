
const { cloudinary } = require("../config/cloudinary");
const slugify = require("slugify");
const { Property } = require("../models/Property");

// GET /api/properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({});
    res.status(200).json({ success: true, data: properties });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// GET /api/properties/:id
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("owner", "name email")
      .populate("agent", "name email");

    if (!property)
      return res.status(404).json({ success: false, message: "Property not found" });

    res.status(200).json({ success: true, data: property });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// POST /api/properties  (with image upload)

const createProperty = async (req, res) => {
  try {
    // Only authenticated owner and agent accounts can create properties
    if (!req.user || !["owner", "agent"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Only property owners and real estate agents can create listings.",
      });
    }

    console.log("Received property data:", req.body);
    console.log("Files:", req.files);

    // 1. Parse JSON fields
    let details = {};
    if (req.body.details) {
      details = typeof req.body.details === "string" ? JSON.parse(req.body.details) : req.body.details;
    }
    let amenities = [];
    if (req.body.amenities) {
      amenities = typeof req.body.amenities === "string" ? JSON.parse(req.body.amenities) : req.body.amenities;
    }

    // 2. Generate slug
    const baseTitle = req.body.title || `property-${Date.now()}`;
    const slug = slugify(baseTitle, { lower: true, strict: true });

    // 3. Images map
    const images = req.files?.map((file) => ({
      url: file.path,
      public_id: file.filename,
    })) || [];

    // 4. Final structured payload with ownership
    const propertyData = {
      title: req.body.title,
      slug,
      description: req.body.description,

      type: req.body.type,
      listingType: req.body.listingType,
      price: Number(req.body.price),
      priceUnit: req.body.priceUnit,

      status: req.body.status || "available",

      // Store authenticated user's ID as owner
      owner: req.user.id,
      ...(req.user.role === "agent" ? { agent: req.user.id } : {}),

      // Location
      location: {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        country: req.body.country || "India",
        coordinates: {
          type: "Point",
          coordinates: [
            Number(req.body.lng) || 0,
            Number(req.body.lat) || 0,
          ],
        },
      },

      // Details
      details: {
        ...details,
        bedrooms: Number(details.bedrooms) || 0,
        bathrooms: Number(details.bathrooms) || 0,
        balconies: Number(details.balconies) || 0,
        area: Number(details.area) || 0,
        floor: Number(details.floor) || 0,
        totalFloors: Number(details.totalFloors) || 0,
        ageOfProperty: Number(details.ageOfProperty) || 0,
      },

      amenities,
      images,
    };

    // 5. Save in DB
    const property = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });

  } catch (err) {
    console.error("Create Property Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/properties/my (Fetch properties belonging to the logged-in user)
const getMyProperties = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const properties = await Property.find({
      $or: [
        { owner: req.user.id },
        { agent: req.user.id },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: properties });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};





// const createProperty = async (req, res) => {
//   try {
//     console.log("📦 Body:", req.body);
//     console.log("📁 Files:", req.files);

//     // ✅ multipart/form-data mein JSON strings parse karne padte hain
//     if (typeof req.body.location === "string") {
//       req.body.location = JSON.parse(req.body.location);
//     }
//     if (typeof req.body.details === "string") {
//       req.body.details = JSON.parse(req.body.details);
//     }
//     if (typeof req.body.amenities === "string") {
//       req.body.amenities = JSON.parse(req.body.amenities);
//     }

//     // ✅ slug generate
//     req.body.slug = slugify(req.body.title, { lower: true, strict: true });

//     // ✅ images attach
//     if (req.files && req.files.length > 0) {
//       req.body.images = req.files.map((file) => ({
//         url:       file.path,
//         public_id: file.filename,
//       }));
//     }

//     const property = await Property.create(req.body);
//     res.status(201).json({ success: true, data: property });

//   } catch (err) {
//     console.error("❌ Full Error:", err.message); // ✅ terminal mein dikhega
//     res.status(500).json({
//       success: false,
//       message: err.message,
//       details: err.errors  // ✅ validation error details
//     });
//   }
// };



// PUT /api/properties/:id
const updateProperty = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    // Verify ownership: only owner or assigned agent can update
    const isOwner = property.owner && property.owner.toString() === req.user.id;
    const isAgent = property.agent && property.agent.toString() === req.user.id;
    if (!isOwner && !isAgent) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You can only edit your own listings",
      });
    }

    // Never allow users to modify protected fields: owner, agent, isVerified, isFeatured
    const updates = { ...req.body };
    delete updates.owner;
    delete updates.agent;
    delete updates.isVerified;
    delete updates.isFeatured;
    delete updates._id;

    if (typeof updates.details === "string") {
      try { updates.details = JSON.parse(updates.details); } catch {}
    }
    if (typeof updates.amenities === "string") {
      try { updates.amenities = JSON.parse(updates.amenities); } catch {}
    }

    // Append new uploaded images if any
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
      updates.images = [...(property.images || []), ...newImages];
    }

    updates.updatedAt = Date.now();

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// DELETE /api/properties/:id  (also deletes images from Cloudinary)
const deleteProperty = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    // Verify ownership: only owner or assigned agent can delete
    const isOwner = property.owner && property.owner.toString() === req.user.id;
    const isAgent = property.agent && property.agent.toString() === req.user.id;
    if (!isOwner && !isAgent) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You can only delete your own listings",
      });
    }

    // Delete images from Cloudinary
    if (property.images && Array.isArray(property.images)) {
      for (const img of property.images) {
        if (img.public_id) {
          try {
            await cloudinary.uploader.destroy(img.public_id);
          } catch (e) {
            console.error("Cloudinary delete error:", e.message);
          }
        }
      }
    }

    await property.deleteOne();
    res.status(200).json({ success: true, message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/properties/search
const searchProperties = async (req, res) => {
  try {
    const {
      keyword, type, status, city,
      minPrice, maxPrice, minArea, maxArea,
      bedrooms, bathrooms, listingType,
      sortBy, order, page, limit,
    } = req.query;

    const query = {};

    if (keyword) query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
    if (type) query.type = type;
    if (status) query.status = status;
    if (listingType) query.listingType = listingType;
    if (city) query["location.city"] = { $regex: city, $options: "i" };
    if (minPrice || maxPrice) query.price = {
      ...(minPrice && { $gte: Number(minPrice) }),
      ...(maxPrice && { $lte: Number(maxPrice) }),
    };
    if (minArea || maxArea) query["details.area"] = {
      ...(minArea && { $gte: Number(minArea) }),
      ...(maxArea && { $lte: Number(maxArea) }),
    };
    if (bedrooms) query["details.bedrooms"] = { $gte: Number(bedrooms) };
    if (bathrooms) query["details.bathrooms"] = { $gte: Number(bathrooms) };

    const sortOrder = order === "desc" ? -1 : 1;
    const sortField = sortBy || "createdAt";
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [properties, total] = await Promise.all([
      Property.find(query).sort({ [sortField]: sortOrder }).skip(skip).limit(limitNum),
      Property.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      pagination: {
        total,
        totalPages: Math.ceil(total / limitNum),
        currentPage: pageNum,
        itemsPerPage: limitNum,
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1,
      },
      data: properties,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllProperties, getPropertyById,
  createProperty, updateProperty,
  deleteProperty, searchProperties,
  getMyProperties,
};
