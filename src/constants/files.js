const FILE_STATUS = {
  UPLOADING: 'UPLOADING',
  PROCESSING: 'PROCESSING',
  READY: 'READY',
  DELETED: 'DELETED',
};

const STORAGE_PATHS = {
  propertyCover: (propertyId, fileName) => `properties/${propertyId}/covers/${fileName}`,
  file: (propertyId, fileId) => `properties/${propertyId}/files/${fileId}`,
};

module.exports = { FILE_STATUS, STORAGE_PATHS };
