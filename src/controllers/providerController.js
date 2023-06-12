const providerFunction = require("../functions/providersFunction");
const { providersModel } = require("../db/providersModel");
const {
  getProviderCount,
  getPaginatedProvider,
} = require("../paginations/providerPagination");

const createProvider = async (req, res) => {
  try {
    const providereData = {
      nameCompany,
      email,
      phonesArray,
      nameContact,
      direction,
      city,
      state,
      country,
    }= req.body;

    // Validate the request body against the schema
    const provider = new storageModel(providereData);
    const validationError = provider.validateSync();
    if (validationError) {
      return res.json({
        status: 400,
        message: validationError.message,
      });
    }
    const createdProvider = await providerFunction.createProvider(
      providereData
    );
    return res.json({
      msg: "Provider added",
      status: 201,
      data: createdProvider,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create provider" });
  }
};

const getProviders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of items per page
    const startIndex = (page - 1) * limit; // Starting index of the current page
    const providerCount = await getProviderCount();
    const totalPages = Math.ceil(providerCount / limit);

    const criteria = req.params.criteria;
    const providers = await getPaginatedProvider(startIndex, limit, criteria);

    return res.json({
      msg: "List of paginated providers ",
      status: 201,
      data: providers,
      meta: {
        totalItems: providerCount,
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

const updateProvider = async (req, res) => {
  try {
    const providerId = req.params._id;
    const {
      _id,
      nameCompany,
      email,
      phonesArray,
      nameContact,
      direction,
      city,
      state,
      country,
    } = req.body;
    const dataToUpdate = {
      _id,
      nameCompany,
      email,
      phonesArray,
      nameContact,
      direction,
      city,
      state,
      country,
    };

    const updatedProvider = await providerFunction.updateProvider(
      providerId,
      dataToUpdate
    );

    return res.json({
      msg: "updated provider ",
      status: 200,
      data: updatedProvider,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProvider = async (req, res) => {
  try {
    const providerId = req.params._id;

    await providerFunction.deleteProvider(providerId);

    return res.json({
      msg: "eliminated provider ",
      status: 204,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createProvider,
  getProviders,
  updateProvider,
  deleteProvider
}