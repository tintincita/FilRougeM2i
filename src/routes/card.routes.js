const cardRouter = require("express").Router();
const createCardController = require("../controllers/card/create-card/create-card.controller");
const readCardController = require("../controllers/card/read-card/read-card.controller");
const readCardsController = require("../controllers/card/read-cards/read-cards.controller");
const deleteCardController = require("../controllers/card/delete-card/delete-card.controller");
const updateCardController = require("../controllers/card/update-card/update-card.controller");

cardRouter.post("/", createCardController.createCard);
cardRouter.get("/", readCardsController.getAllCards);
cardRouter.get("/:id", readCardController.getCardByID);
cardRouter.put("/:id", updateCardController.updateCardByID);
cardRouter.delete("/:id", deleteCardController.deleteCardByID);

module.exports = cardRouter;
