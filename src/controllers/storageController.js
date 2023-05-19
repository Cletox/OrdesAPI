const storageFunction = require("../functions/storageFunctions");
const {storageModel} = require("../db/storageModel");
const { getStorageCount, getPaginatedStorage } = require('../paginations/storagePagination');



exports.createStorage = async (req, res) => {
    try {
      const { _id, placeId, name } = req.body;
      const storageData =  { _id, placeId, name };
      //const productData = req.body; // Alternative2
     

  
      // Validate the request body against the schema
      const storage = new storageModel(storageData);
      const validationError = storage.validateSync();
      if (validationError) {
          return res.json({
          status: 400,
          message: validationError.message
           });
      }
      const createdProduct = await productService.createProduct(productData);
      return res.json({
          msg: "Producto agregado",
          status: 201,
          data: createdProduct
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create storage' });
    }
  };
  
  
  
  exports.getStorages = async (req, res) => {
      try {
  
          const storageId = req.query._id;
          const page = parseInt(req.query.page) || 1; // Current page number
          const limit = parseInt(req.query.limit) || 10; // Number of items per page
          const startIndex = (page - 1) * limit; // Starting index of the current page
          const storageCount = await getStorageCount();
          const totalPages = Math.ceil(storageCount / limit);
  
      if (!storageId) {
        return res.status(400).json({ message: 'categoryId is required' });
      }
      
      
      const criteria = req.query.criteria;
      const storages = await getPaginatedStorage(startIndex, limit,criteria);
        
        return res.json({
          msg: "List of storages",
          status: 201,
          data: storages,
          meta: {
            totalItems: storageCount,
            itemsPerPage: limit,
            totalPages: totalPages,
            currentPage: page,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null
          }
      });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  
  
  
    exports.updateStorage = async (req, res) => {
      try {
        const storageId = req.params._id;
        const dataToUpdate = req.body;
    
        const updatedStorage = await storageFunction.updateStorage(storageId, dataToUpdate);
        
        return res.json({
          msg: "updated storage ",
          status: 200,
          data: updatedStorage
      });
  
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  
  
    exports.deleteStorage = async (req, res) => {
      try {
        const storageId = req.params._id;
    
        await storageFunction.deleteStorage(storageId);
        
        return res.json({
          msg: "eliminated product ",
          status: 204,
        });
  
  
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };