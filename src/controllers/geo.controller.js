const GeoModel = require("../models/geoModel");
const httpStatus = require("http-status");

/**
 * Get States
 * @public
 */
exports.getStates = async (req, res) => {
  let states = await GeoModel.getStates();
  if (states) {
    return res.json({ states });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Get Cities By State_id
 * @public
 */

exports.getCitiesById = async (req, res) => {
  let cities = await GeoModel.getCitiesByStateId(req.params.id);
  if (cities) {
    return res.json({ cities });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};