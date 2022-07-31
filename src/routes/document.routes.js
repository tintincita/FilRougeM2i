const documentRouter = require("express").Router();
const documentController = require("../controllers/document.controller");

documentRouter.get("/", documentController.getAllDocuments);
documentRouter.get("/:id", documentController.getDocumentByID);
documentRouter.post("/", documentController.createDocument);
// documentRouter.put("/:id", documentController.updateDocumentByID);
documentRouter.delete("/:id", documentController.deleteDocumentByID);

module.exports = documentRouter;
