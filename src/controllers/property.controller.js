const PropertyModel = require("../models/propertyModel");
const httpStatus = require("http-status");
const { STORAGE_PATHS } = require("../constants/files");
const filesBucket = require("../config/storage");
const fs = require('fs');
const path = require('path')
const sharp = require("sharp");
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

exports.getRecentProperties = async (req, res) => {
  let Properties = await PropertyModel.getRecentProperties();
  if (Properties) {
    if (Properties.length > 0) {
      Properties.forEach(element => {
        element.details = JSON.parse(element.details);
        element.resources = JSON.parse(element.resources);
        element.thumbnails = JSON.parse(element.thumbnails);
      });
    }
    return res.json({ Properties });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
}

/**
 * Get Properties
 * @public
 */

exports.getProperties = async (req, res) => {
  const params = req.query.params ? JSON.parse(req.query.params) : {};
  let Properties = await PropertyModel.getProperties(params);
  if (Properties) {
    if (Properties.length > 0) {
      Properties.forEach(element => {
        element.details = JSON.parse(element.details);
        element.resources = JSON.parse(element.resources);
        element.thumbnails = JSON.parse(element.thumbnails);
      });
    }
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
    if (Properties.length > 0) {
      Properties.forEach(element => {
        element.details = JSON.parse(element.details);
        element.resources = JSON.parse(element.resources);
        element.thumbnails = JSON.parse(element.thumbnails);
      });
    }
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

const fileUploading = async (thumbs, id, files) => {
  const filePromises = files.map(async (file) => {
    const extension = file.originalname.split('.').reverse()[0];
    const options = {
      destination: thumbs ? STORAGE_PATHS.propertyThumb(id, `${file.filename}.${extension}`) : STORAGE_PATHS.propertyCover(id, `${file.filename}.${extension}`),
      public: true,
    }
    const pathString = file.path;

    try {
      fileResponse = await filesBucket.upload(pathString, options);
      fs.unlinkSync(file.path)
      const { mediaLink } = fileResponse[1];
      return thumbs ? {url: mediaLink, order: file.order} : mediaLink;
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
  const thumbs = [];
  await Promise.all(
    files.map(async (file, index) => {
      await sharp(file.path)
        .resize(500)
        .jpeg({quality: 50})
        .toFile(
            path.resolve(file.destination,`thumbnail_${file.filename}`)
        )
        thumbs.push({
          originalname: file.originalname,
          destination: file.destination,
          path: path.resolve(file.destination,`thumbnail_${file.filename}`),
          filename: `thumbnail_${file.filename}`,
          order: index,
        })
    })
  );
  const newResources = await fileUploading(false, req.params.id, files);
  const resources = Property.resources === '' ? newResources : JSON.parse(Property.resources).concat(newResources);
  const thumbResources = await fileUploading(true, req.params.id, thumbs);
  const thumbnails = !Property.thumbnails || Property.thumbnails === '' ? thumbResources : JSON.parse(Property.thumbnails).concat(thumbResources);
  PropertyModel.updateProperty(req.params.id, {...Property, resources: JSON.stringify(resources), thumbnails: JSON.stringify(thumbnails)})
    .then((data) => {
      return res.status(200).json({ result: "Successfully Added" });
    })
    .catch((err)=> {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
    });
    
};

exports.deleteProperty = async (req, res) => {
  PropertyModel.deleteProperty(req.params.id)
    .then((data) => {
      return res.status(200).json({ result: "Successfully deleted" });
    })
    .catch((err)=> {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
    });
}

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
    if (Properties.length > 0) {
      Properties.forEach(element => {
        element.details = JSON.parse(element.details);
        element.resources = JSON.parse(element.resources);
        element.thumbnails = JSON.parse(element.thumbnails);
      });
    }
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
  if (result) {
    return res.status(200).json({ result });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
}
