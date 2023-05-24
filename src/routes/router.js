const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const storageController = require("../controllers/storageController");
const categoriesInventoryController = require("../controllers/categoriesInventoryController");
const inventoryController = require("../controllers/inventoryController");
const transactionsInventoryController = require("../controllers/transactionsInventoryController");
const ordersBuyController = require("../controllers/ordersBuyController");
const creditsController = require("../controllers/creditsController");
const transactionsCreditsController = require("../controllers/transactionsCreditsController");
const invoiceController = require("../controllers/invoiceController");
const categoryTransactionController = require("../controllers/categoryTransactionController");
const transactionController = require("../controllers/transactionController");

// product routers
router.post(
  "/products",
  validateCreateProduct,
  productController.createProduct
);
router.get("/products", productController.getAllProducts);
router.put("/products", productController.updateProduct);
router.delete("/products", productController.deleteProduct);

//storage routers
router.post("/storage", storageController.createStorage);
router.get("/storage", storageController.getStorages);
router.put("/storage", storageController.updateStorage);
router.delete("/storage", storageController.deleteStorage);

//categorie invetory routers
router.post(
  "/categorieInventory",
  categoriesInventoryController.createCategoriesInventory
);
router.get(
  "/categorieInventory",
  categoriesInventoryController.getCategoriesInventory
);
router.put(
  "/categorieInventory",
  categoriesInventoryController.updateCategoriesInventory
);
router.delete(
  "/categorieInventory",
  categoriesInventoryController.deleteCategoriesInventory
);

// invetory routers
router.post("/inventory", inventoryController.createInventory);
router.get("/inventory", inventoryController.getInventories);
router.put("/inventory", inventoryController.updateInventory);
router.delete("/inventory", inventoryController.deleteInventory);

// Transactions Inventory routes
router.post(
  "/transactionsInventory",
  transactionsInventoryController.createTransactionInventory
);
router.get(
  "/transactionsInventory",
  transactionsInventoryController.getAllTransactionsInventory
);
router.put(
  "/transactionsInventory",
  transactionsInventoryController.updateTransactionInventory
);
router.delete(
  "/transactionsInventory",
  transactionsInventoryController.deleteTransactionInventory
);

// Orders Buy routes
router.post("/ordersBuy", ordersBuyController.createOrderBuy);
router.get("/ordersBuy", ordersBuyController.getAllOrdersBuy);
router.put("/ordersBuy", ordersBuyController.updateOrderBuy);
router.delete("/ordersBuy", ordersBuyController.deleteOrderBuy);

// Credits routes
router.post("/credits", creditsController.createCredit);
router.get("/credits", creditsController.getAllCredits);
router.put("/credits", creditsController.updateCredit);
router.delete("/credits", creditsController.deleteCredit);

// Transactions Credits routes
router.post(
  "/transactionsCredits",
  transactionsCreditsController.createTransactionCredit
);
router.get(
  "/transactionsCredits",
  transactionsCreditsController.getAllTransactionsCredits
);
router.put(
  "/transactionsCredits",
  transactionsCreditsController.updateTransactionCredit
);
router.delete(
  "/transactionsCredits",
  transactionsCreditsController.deleteTransactionCredit
);

// Invoice routes
router.post("/invoice", invoiceController.createInvoice);
router.get("/invoice", invoiceController.getAllInvoices);
router.put("/invoice", invoiceController.updateInvoice);
router.delete("/invoice", invoiceController.deleteInvoice);

// Category Transaction routes
router.post(
  "/categoryTransaction",
  categoryTransactionController.createCategoryTransaction
);
router.get(
  "/categoryTransaction",
  categoryTransactionController.getAllCategoryTransactions
);
router.put(
  "/categoryTransaction",
  categoryTransactionController.updateCategoryTransaction
);
router.delete(
  "/categoryTransaction",
  categoryTransactionController.deleteCategoryTransaction
);

// Transaction routes
router.post("/transaction", transactionController.createTransaction);
router.get("/transaction", transactionController.getAllTransactions);
router.put("/transaction", transactionController.updateTransaction);
router.delete("/transaction", transactionController.deleteTransaction);

module.exports = router;
