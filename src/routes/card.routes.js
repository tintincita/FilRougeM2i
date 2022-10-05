const cardRouter = require("express").Router();
const createCardController = require("../controllers/card/create-card/create-card.controller");
const readCardsController = require("../controllers/card/read-cards/read-cards.controller");
const readCardController = require("../controllers/card/read-card/read-card.controller");
const updateCardController = require("../controllers/card/update-card/update-card.controller");
const deleteCardController = require("../controllers/card/delete-card/delete-card.controller");

cardRouter.post("/", createCardController.createCard);
cardRouter.get("/", readCardsController.readCards);
cardRouter.get("/:id", readCardController.readCard);
cardRouter.put("/:id", updateCardController.updateCard);
cardRouter.delete("/:id", deleteCardController.deleteCard);

module.exports = cardRouter;
