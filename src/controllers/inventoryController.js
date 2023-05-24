const inventoryFunction = require("../functions/inventoryFunctions");
const { inventoryModel } = require("../db/inventoryModel");
const {
  getInventoryCount,
  getPaginatedInventory,
} = require("../paginations/inventoryPagination");

exports.createInventory = async (req, res) => {
  try {
    const {
      _id,
      productInventory,
      quanty,
      quantyMin,
      storageId,
      placeId,
      createAt,
      upadteAt,
    } = req.body;
    const inventoryData = {
      _id,
      productInventory,
      quanty,
      quantyMin,
      storageId,
      placeId,
      createAt,
      upadteAt,
    };

    // Validate the request body against the schema
    const inventoty = new inventoryModel(inventoryData);
    const validationError = inventoty.validateSync();
    if (validationError) {
      return res.json({
        status: 400,
        message: validationError.message,
      });
    }
    const createdInventory = await inventoryFunction.createInventory(
      inventoryData
    );
    return res.json({
      msg: "Inventory added",
      status: 201,
      data: createdInventory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create inventory" });
  }
};

exports.getInventories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of items per page
    const startIndex = (page - 1) * limit; // Starting index of the current page
    const inventoryCount = await getInventoryCount();
    const totalPages = Math.ceil(inventoryCount / limit);

    const criteria = req.params.criteria;
    const inventories = await getPaginatedInventory(
      startIndex,
      limit,
      criteria
    );

    return res.json({
      msg: "List of paginated inventories ",
      status: 201,
      data: inventories,
      meta: {
        totalItems: inventoryCount,
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

exports.updateInventory = async (req, res) => {
  try {
    const inventoryId = req.params._id;
    const {
      _id,
      productInventory,
      quanty,
      quantyMin,
      storageId,
      placeId,
      createAt,
      upadteAt,
    } = req.body;
    const dataToUpdate = {
      _id,
      productInventory,
      quanty,
      quantyMin,
      storageId,
      placeId,
      createAt,
      upadteAt,
    };

    const updatedStorage = await inventoryFunction.updateInventory(
      inventoryId,
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

exports.deleteInventory = async (req, res) => {
  try {
    const inventoryId = req.params._id;

    await storageFunction.deleteStorage(inventoryId);

    return res.json({
      msg: "eliminated inventory ",
      status: 204,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
