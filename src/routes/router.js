const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// const storageController = require("../controllers/storageController");
// const categoriesInventoryController = require("../controllers/categoriesInventoryController");
// const inventoryController = require("../controllers/inventoryController");
// const transactionsInventoryController = require("../controllers/transtacionsInventoryController");
// const ordersBuyController = require("../controllers/ordersBuyController");
// const creditsController = require("../controllers/creditsController");
// const transactionsCreditsController = require("../controllers/transactionsCreditsController");
// const invoiceController = require("../controllers/invoicesController");
// const categoryTransactionController = require("../controllers/categoryTransactionsController");
// const transactionController = require("../controllers/transactionController");

router.get("/", (req, res) => {
  res.send("Pagina principal, /");
});
router.get("/products", productController.getAllProducts);
router.post("/products", productController.createProduct);
router.put("/products/:_id", productController.updateProduct);
router.delete("/products/:_id", productController.deleteProduct);

// //storage routers
// router.post("/storage", storageController.createStorage);
// router.get("/storage", storageController.getStorages);
// router.put("/storage", storageController.updateStorage);
// router.delete("/storage", storageController.deleteStorage);

// //categorie invetory routers
// router.post(
//   "/categorieInventory",
//   categoriesInventoryController.createCategoriesInventory
// );
// router.get(
//   "/categorieInventory",
//   categoriesInventoryController.getCategoriesInventory
// );
// router.put(
//   "/categorieInventory",
//   categoriesInventoryController.updateCategoriesInventory
// );
// router.delete(
//   "/categorieInventory",
//   categoriesInventoryController.deleteCategoriesInventory
// );

// // invetory routers
// router.post("/inventory", inventoryController.createInventory);
// router.get("/inventory", inventoryController.getInventories);
// router.put("/inventory", inventoryController.updateInventory);
// router.delete("/inventory", inventoryController.deleteInventory);

// // Transactions Inventory routes
// router.post(
//   "/transactionsInventory",
//   transactionsInventoryController.createTranstacionsInventory
// );
// router.get(
//   "/transactionsInventory",
//   transactionsInventoryController.getSTranstacionsInventory
// );
// router.put(
//   "/transactionsInventory",
//   transactionsInventoryController.updateTranstacionsInventory
// );
// router.delete(
//   "/transactionsInventory",
//   transactionsInventoryController.deleteTranstacionsInventory
// );

// // Orders Buy routes
// router.post("/ordersBuy", ordersBuyController.createOrdersBuy);
// router.get("/ordersBuy", ordersBuyController.getOrdersBuy);
// router.put("/ordersBuy", ordersBuyController.updateOrdersBuy);
// router.delete("/ordersBuy", ordersBuyController.deleteOrdersBuy);

// // Credits routes
// router.post("/credits", creditsController.createCredit);
// router.get("/credits", creditsController.getCredits);
// router.put("/credits", creditsController.updateCredit);
// router.delete("/credits", creditsController.deleteCredits);

// // Transactions Credits routes
// router.post(
//   "/transactionsCredits",
//   transactionsCreditsController.createTransactionsCredits
// );
// router.get(
//   "/transactionsCredits",
//   transactionsCreditsController.getTransactionsCredits
// );
// router.put(
//   "/transactionsCredits",
//   transactionsCreditsController.updateTransactionsCredits
// );
// router.delete(
//   "/transactionsCredits",
//   transactionsCreditsController.deleteTransactionsCredits
// );

// // Invoice routes
// router.post("/invoice", invoiceController.createInvoice);
// router.get("/invoice", invoiceController.getInvoices);
// router.put("/invoice", invoiceController.updateInvoice);
// router.delete("/invoice", invoiceController.deleteInvoice);

// // Category Transaction routes
// router.post(
//   "/categoryTransaction",
//   categoryTransactionController.createCategoryTransaction
// );
// router.get(
//   "/categoryTransaction",
//   categoryTransactionController.getCategoryTransactions
// );
// router.put(
//   "/categoryTransaction",
//   categoryTransactionController.updateCategoryTransaction
// );
// router.delete(
//   "/categoryTransaction",
//   categoryTransactionController.deleteCategoryTransaction
// );

// // Transaction routes
// router.post("/transaction", transactionController.createTransaction);
// router.get("/transaction", transactionController.getTransactions);
// router.put("/transaction", transactionController.updateTransaction);
// router.delete("/transaction", transactionController.deleteTransaction);

module.exports = router;
