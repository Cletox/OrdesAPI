const invoiceFunction = require("../functions/invoicesFunction");
const { invoicesModel } = require("../db/invoicesModel");
const {
  getInvoicesCount,
  getPaginatedInvoices,
} = require("../paginations/invoicesPagination");

const createInvoice = async (req, res) => {
  try {
   const invoiceData = {
      placeId,
      clientId,
      taxProfileId,
      invoice,
      paymentId,
      createdAt,
      updatedAt,
    }= req.body;

    // Validate the request body against the schema
    const invoices = new invoicesModel(invoiceData);
    const validationError = invoices.validateSync();
    if (validationError) {
      return res.json({
        status: 400,
        message: validationError.message,
      });
    }
    const createdInvoice = await invoiceFunction.createInvoice(invoiceData);
    return res.json({
      msg: "Invoice added",
      status: 201,
      data: createdInvoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create Invoice" });
  }
};

const getInvoices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of items per page
    const startIndex = (page - 1) * limit; // Starting index of the current page
    const invoiceCount = await getInvoicesCount();
    const totalPages = Math.ceil(invoiceCount / limit);

    const criteria = req.params.criteria;
    const invoices = await getPaginatedInvoices(startIndex, limit, criteria);

    return res.json({
      msg: "List of invoices paginated  ",
      status: 201,
      data: invoices,
      meta: {
        totalItems: invoiceCount,
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

const updateInvoice = async (req, res) => {
  try {
    const invoiceId = req.params._id;
    const {
      placeId,
      clientId,
      taxProfileId,
      invoice,
      paymentId,
      createdAt,
      updatedAt,
    } = req.body;
    const dataToUpdate = {
      placeId,
      clientId,
      taxProfileId,
      invoice,
      paymentId,
      createdAt,
      updatedAt,
    };

    const updatedInvoice = await invoiceFunction.updateInvoice(
      invoiceId,
      dataToUpdate
    );

    return res.json({
      msg: "updated Invoice ",
      status: 200,
      data: updatedInvoice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const invoiceId = req.params._id;

    await invoiceFunction.deleteInvoice(invoiceId);
    return res.json({
      msg: "eliminated invoice ",
      status: 204,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice
}