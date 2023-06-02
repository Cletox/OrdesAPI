const storageFunction = require("../functions/storageFunctions");
const { storageModel } = require("../db/storageModel");
const {
  getStorageCount,
  getPaginatedStorage,
} = require("../paginations/storagePagination");

const createStorage = async (req, res) => {
  try {
    const storageData = {  placeId, name } = req.body;

    // Validate the request body against the schema
    const storage = new storageModel(storageData);
    const validationError = storage.validateSync();
    if (validationError) {
      return res.json({
        status: 400,
        message: validationError.message,
      });
    }
    const createdStorage = await storageFunction.createStorage(storageData);
    return res.json({
      msg: "Storage added",
      status: 201,
      data: createdStorage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create storage" });
  }
};

const getStorages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of items per page
    const startIndex = (page - 1) * limit; // Starting index of the current page
    const storageCount = await getStorageCount();
    const totalPages = Math.ceil(storageCount / limit);
    //const criteria = req.params.criteria;
       
   //const storages = await getPaginatedStorage(startIndex, limit);
const storages = await getPaginatedStorage(startIndex, limit);
console.log('Storages in controller:', storages);
    return res.json({
      msg: "List of paginated storages ",
      status: 201,
      data: storages,
      meta: {
        totalItems: storageCount,
        itemsPerPage: limit,
        totalPages: totalPages,
        currentPage: page,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStorage = async (req, res) => {
  try {
    const storageId = req.params._id;
    const { _id, placeId, name } = req.body;
    const dataToUpdate = { _id, placeId, name };

    const updatedStorage = await storageFunction.updateStorage(
      storageId,
      dataToUpdate
    );

    return res.json({
      msg: "updated storage ",
      status: 200,
      data: updatedStorage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStorage = async (req, res) => {
  try {
    const storageId = req.params._id;

        await storageFunction.deleteStorage(storageId);

    return res.json({
      msg: "eliminated storage ",
      status: 204,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStorage,
  getStorages,
  updateStorage,
  deleteStorage,
}