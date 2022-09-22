const Group = require("../models/group.model");
const Card = require("../models/card.model");
const Document = require("../models/document.model");

/**
 * Get all Groups with GET method from '/api/group'.
 *
 * @param {*} request
 * @param {*} response
 *
 * @return All groups in JSON
 */
module.exports.getAllGroups = async (request, response) => {
  const groups = await Group.find({});
  response.json(groups);
};

/**
 * Get a group by ID with GET method from '/api/group/:id'
 *
 * @param {*} request
 * @param {*} response
 *
 * @return group in JSON
 */
module.exports.getGroupByID = async (request, response) => {
  const group = await Group.findById(request.params.id);
  if (group) {
    response.json(group);
  } else {
    response.status(404).end();
  }
};

/**
 * Create a group with POST method from '/api/group '.
 *
 * @param {*} request
 * @param {*} response
 *
 * @return Created group in JSON
 */
module.exports.createGroup = async (request, response) => {
  // console.log(request.body);
  let { contains, document, indentation, title } = request.body;

  if (!contains) {
    response.status(400);
    throw "Missing cards, cannot create empty group";
  }

  const parentDocument = await Document.findById(document);
  if (!parentDocument) {
    response.status(400);
    throw "Missing document, cannot create orphan group";
  }

  if (!indentation) {
    indentation = contains.map(() => 0);
  }

  const group = new Group({
    contains: contains,
    document: document,
    indentation: indentation,
    title: title,
  });

  const savedGroup = await group.save();

  // *** updates newCardsAndGroups replacing new group in place contained cards
  let newCardsAndGroups = parentDocument.editorCardsAndGroups.map((card) =>
    contains.includes(String(card)) ? savedGroup.id : card
  );
  newCardsAndGroups = newCardsAndGroups.filter((v, i, a) => a.indexOf(v) === i);
  parentDocument.editorCardsAndGroups = newCardsAndGroups;
  await parentDocument.save();

  //  *** change group field within each contained card to savedGroup
  for (i = 0; i < contains.length; i++) {
    await Card.findByIdAndUpdate(contains[0], { group: savedGroup.id });
  }

  response.status(201).json(savedGroup);
};

/**
 * Delete group by ID with DELETE method from '/api/group/:id'
 *
 * @param {*} request
 * @param {*} response
 *
 * @return Status 204
 */
module.exports.deleteGroupByID = async (request, response) => {
  const target = request.params.id;
  const groupToDelete = await Group.findById(target);

  // *** replace group with cards (contains) in document editorCardsAndGroups
  let parentDoc = await Document.findById(groupToDelete.document);
  let newCardsAndGroups = [];

  for (item of parentDoc.editorCardsAndGroups) {
    if (item == groupToDelete.id) {
      groupToDelete.contains.forEach((containedItem) => {
        newCardsAndGroups.push(containedItem);
      });
    } else {
      newCardsAndGroups.push(item);
    }
  }

  await Document.findByIdAndUpdate(
    groupToDelete.document,
    { editorCardsAndGroups: newCardsAndGroups },
    { new: true }
  );
  await Group.findByIdAndRemove(target);
  response.status(204).send(`Group deleted : ${target}`);
};

/**
 * Update group with PUT method from '/api/group/:id'
 *
 * @param {*} request
 * @param {*} response
 *
 * @return Status 200
 */
module.exports.updateGroupByID = (request, response, next) => {
  const { contains, document, indentation, title } = request.body;
  const target = request.params.id;

  console.log("contains.lenght", contains.length);

  const group = {
    contains: contains,
    document: document,
    indentation: indentation,
    title: title,
  };

  let oldGroup = Group.findById(target);
  if (oldGroup.document != document) {
    console.log("group changed doc");
    // ** update old and new doc
  }

  Group.findByIdAndUpdate(target, group, { new: true })
    .then((updatedGroup) => {
      response.json(updatedGroup);
    })
    .catch((error) => next(error));
};
