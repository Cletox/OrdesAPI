const caterogiesInventoryFunction = require("../functions/categoriesInventoryFunctions");
const { categoriesInventoryModel } = require("../db/categoriesInventoryModel");
const {
  getCategoriesInventoryCount,
  getPaginatedCategoriesInventory,
} = require("../paginations/categoriesInventoryPagination");

const createCategoriesInventory = async (req, res) => {
  try {
    const categoriesInventoryData = { placeId, name, taxProfileId } = req.body;

    // Validate the request body against the schema
    const categoriesInventory = new categoriesInventoryModel(
      categoriesInventoryData
    );
    const validationError = categoriesInventory.validateSync();
    if (validationError) {
      return res.json({
        status: 400,
        message: validationError.message,
      });
    }
    const createdCategoriesInventory =
      await caterogiesInventoryFunction.createCategoriesInventory(
        categoriesInventoryData
      );
    return res.json({
      msg: "categorie invetory added",
      status: 201,
      data: createdCategoriesInventory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create categorie invetory" });
  }
};

const getCategoriesInventory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of items per page
    const startIndex = (page - 1) * limit; // Starting index of the current page
    const categoriesInventoryCount = await getCategoriesInventoryCount();
    const totalPages = Math.ceil(categoriesInventoryCount / limit);

    const criteria = req.params.criteria;
    const categoriesInventory = await getPaginatedCategoriesInventory(
      startIndex,
      limit,
      criteria
    );

    return res.json({
      msg: "List of paginated categorie inventory ",
      status: 201,
      data: categoriesInventory,
      meta: {
        totalItems: categoriesInventoryCount,
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

const updateCategoriesInventory = async (req, res) => {
  try {
    const categorieInventoryId = req.params._id;
    const dataToUpdate = { placeId, name, taxProfileId } = req.body ;

    const updatedCategorieInvetory =
      await caterogiesInventoryFunction.updateCategoriesInventory(
        categorieInventoryId,
        dataToUpdate
      );

    return res.json({
      msg: "updated categorie inventory ",
      status: 200,
      data: updatedCategorieInvetory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategoriesInventory = async (req, res) => {
  try {
    const categorieInventoryId = req.params._id;

    await caterogiesInventoryFunction.deleteCategoriesInventory(
      categorieInventoryId
    );

    return res.json({
      msg: "eliminated categorie inventory ",
      status: 204,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategoriesInventory,
  getCategoriesInventory,
  updateCategoriesInventory,
  deleteCategoriesInventory,
}
