const documentRouter = require("express").Router();
const createDocumentController = require("../controllers/document/create-document/create-document.controller");
const readDocumentsController = require("../controllers/document/read-documents/read-documents.controller");
const readDocumentController = require("../controllers/document/read-document/read-document.controller");
const updateDocumentController = require("../controllers/document/update-document/update-document.controller");
const deleteDocumentController = require("../controllers/document/delete-document/delete-document.controller");

documentRouter.post("/", createDocumentController.createDocument);
documentRouter.get("/", readDocumentsController.readDocuments);
documentRouter.get("/:id", readDocumentController.readDocument);
documentRouter.put("/:id", updateDocumentController.updateDocument);
documentRouter.delete("/:id", deleteDocumentController.deleteDocument);

module.exports = documentRouter;
