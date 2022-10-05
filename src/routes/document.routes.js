const documentRouter = require("express").Router();
const readDocumentsController = require("../controllers/document/read.documents.controller");
const readDocumentController = require("../controllers/document/read.document.controller");
const createDocumentController = require("../controllers/document/create.document.controller");
const deleteDocumentController = require("../controllers/document/delete.document.controller");
const updateDocumentController = require("../controllers/document/update.document.controller");

documentRouter.get("/", readDocumentsController.getAllDocuments);
documentRouter.get("/:id", readDocumentController.getDocumentByID);
documentRouter.post("/", createDocumentController.createDocument);
documentRouter.put("/:id", updateDocumentController.updateDocumentByID);
documentRouter.delete("/:id", deleteDocumentController.deleteDocumentByID);

module.exports = documentRouter;
