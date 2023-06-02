const creditsFunction = require("../functions/creditsFunction");
const { creditsModel } = require("../db/creditsModel");
const {
  getCreditsCount,
  getPaginatedCredits,
} = require("../paginations/creditsPagination");

const createCredit = async (req, res) => {
  try {
    const creditsData = {
      clientId,
      placeId,
      quanty,
      createdAt,
      updatedAt,
    } = req.body;

    // Validate the request body against the schema
    const credits = new creditsModel(creditsData);
    const validationError = credits.validateSync();
    if (validationError) {
      return res.json({
        status: 400,
        message: validationError.message,
      });
    }
    const createdCredits = await creditsFunction.createCredit(creditsData);
    return res.json({
      msg: "Credit added",
      status: 201,
      data: createdCredits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create credit" });
  }
};

const getCredits = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of items per page
    const startIndex = (page - 1) * limit; // Starting index of the current page
    const creditCount = await getCreditsCount();
    const totalPages = Math.ceil(creditCount / limit);

    const criteria = req.params.criteria;
    const credits = await getPaginatedCredits(startIndex, limit, criteria);

    return res.json({
      msg: "List of paginated credits ",
      status: 201,
      data: credits,
      meta: {
        totalItems: creditCount,
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

const updateCredit = async (req, res) => {
  try {
    const creditsId = req.params._id;
    const dataToUpdate = ({ clientId, placeId, quanty, createdAt, updatedAt } =
      req.body);

    const updatedCredit = await creditsFunction.updateCredit(
      creditsId,
      dataToUpdate
    );

    return res.json({
      msg: "updated credit ",
      status: 200,
      data: updatedCredit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCredits = async (req, res) => {
  try {
    const creditsId = req.params._id;

    await creditsFunction.deleteCredit(creditsId);
    return res.json({
      msg: "eliminated credit ",
      status: 204,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createCredit,
  getCredits,
  updateCredit,
  deleteCredits
}