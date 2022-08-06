const cardRouter = require("express").Router();
const cardController = require("../controllers/card.controller");

cardRouter.get("/", cardController.getAllCards);
cardRouter.get("/:id", cardController.getCardByID);
cardRouter.post("/", cardController.createCard);
// cardRouter.put("/:id", cardController.updateCardByID);
cardRouter.delete("/:id", cardController.deleteCardByID);

module.exports = cardRouter;
