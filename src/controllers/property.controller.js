const PropertyModel = require("../models/PropertyModel");
const httpStatus = require("http-status");
const { STORAGE_PATHS } = require("../constants/files");
const filesBucket = require("../config/storage");
const path = require('path');
// const path = require('path');
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

/**
 * Get Properties By Owner Id
 * @public
 */
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
  const Property = JSON.parse(req.body.info);
  const result = await PropertyModel.addNewProperty(Property);
  const { file } = req;
  const extension = file.originalname.split('.').reverse()[0];
  const options = {
    destination: STORAGE_PATHS.propertyCover(result.insertId, `${file.filename}.${extension}`),
    public: true,
  }
  const pathString = file.path;
  console.log(typeof(pathString));
  filesBucket.upload(pathString, options)
    .then((fileResponse) => {
      const { mediaLink } = fileResponse[1];
      console.log(mediaLink);
      let resources = [];
      resources.push(mediaLink);
      PropertyModel.updateProperty(result.insertId, {...Property, resources: JSON.stringify(resources)}).then((data) => {
        // const response = buildingSchema.toJs(data.rows[0]);

        return res.status(200).json({ result: "Successfully Added" });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
    });
};
