const PropertyModel = require("../models/PropertyModel");
const httpStatus = require("http-status");

/**
 * Get Property
 * @public
 */
exports.getProperty = async (req, res) => {
  let Property = await PropertyModel.getProperty(req.params.id);
  if (Property) {
    Property.details = JSON.parse(Property.details);
    return res.json({ Property });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Get Properties
 * @public
 */

exports.getProperties = async (req, res) => {
  let Properties = await PropertyModel.getProperties();
  if (Properties) {
    Properties.forEach((element) => {
      element.details = JSON.parse(element.details);
    });
    return res.json({ Properties });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

exports.getPropertiesByOwnerId = async (req, res) => {
  let Properties = await PropertyModel.getPropertiesByOwnerId(req.user.id);
  if (Properties) {
    return res.json({ Properties });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
}

/**
 * Update Property
 * @public
 */
exports.updateProperty = async (req, res) => {
  const Property = req.body;
  const result = await PropertyModel.updateProperty(req.params.id, Property);
  if (result) {
    return true;
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Add a new Property
 */
exports.addNewProperty = async (req, res) => {
  const Property = req.body;
  const result = await PropertyModel.addNewProperty(Property);
  if (result) {
    return true;
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
