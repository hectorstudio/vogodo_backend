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
    Properties.forEach(element => {
      element.details = JSON.parse(element.details);
      element.resources = JSON.parse(element.resources);
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
    Properties.forEach(element => {
      element.details = JSON.parse(element.details);
      element.resources = JSON.parse(element.resources);
    });
    return res.json({ Properties });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
}

/**
 * Add a new Property
 * @public
 */
exports.addNewProperty = async (req, res) => {
  const Property = req.body;
  const result = await PropertyModel.addNewProperty(Property);
  if (result) {
    return res.status(200).json({ result: result });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Update Property
 */

const fileUploading = async (id, files) => {
  const filePromises = files.map(async (file) => {
    const extension = file.originalname.split('.').reverse()[0];
    const options = {
      destination: STORAGE_PATHS.propertyCover(id, `${file.filename}.${extension}`),
      public: true,
    }
    const pathString = file.path;
    try {
      fileResponse = await filesBucket.upload(pathString, options);
      const { mediaLink } = fileResponse[1];
      return mediaLink;
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  });
  const resources = await Promise.all(filePromises);
  return resources;
}

exports.updateProperty = async (req, res) => {
  const Property = JSON.parse(req.body.info);
  const { files } = req;
  const resources = await fileUploading(req.params.id, files);
  PropertyModel.updateProperty(req.params.id, {...Property, resources: JSON.stringify(resources)})
    .then((data) => {
      return res.status(200).json({ result: "Successfully Added" });
    })
    .catch((err)=> {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
    });
};

/**
 * get favorites
 * @public
 */
exports.getFavorites = async (req, res) => {
  const result = await PropertyModel.getFavorites(req.params.uid);
  if (result) {
    return res.status(200).json({ result });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
}

/**
 * get favorites by owner_id
 * @public
 */
exports.getFavoritesByOwnerId = async (req, res) => {
  const Properties = await PropertyModel.getFavoritesByOwnerId(req.params.uid);
  if (Properties) {
    Properties.forEach(element => {
      element.details = JSON.parse(element.details);
      element.resources = JSON.parse(element.resources);
    });
    return res.status(200).json({ Properties });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
}

/**
 * Save as favorite
 * @public
 */
exports.saveAsFavorite = async (req, res) => {
  const item = req.body;
  let result = await PropertyModel.getFavorite(item);
  if (result.length < 1) {
    result = await PropertyModel.insertIntoFavorite(item)
  } else {
    result = await PropertyModel.updateFavorite(result[0].id, item);
  }
  console.log(result);
  if (result) {
    return res.status(200).json({ result });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
}
