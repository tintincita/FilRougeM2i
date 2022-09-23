const Group = require("../models/group.model");
const Card = require("../models/card.model");
const Document = require("../models/document.model");
const { addToArray } = require("../utils/object_helper");

/**
 * Get all Groups with GET method from '/api/group'.
 *
 * @param {*} request
 * @param {*} response
 *
 * @return All groups in JSON
 */
module.exports.getAllGroups = async (request, response) => {
    const groups = await Group.find({}).populate('contains');
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
        indentation = contains.map(() => 0)
    }

    const group = new Group({
        contains: contains,
        document: document,
        indentation: indentation,
        title: title
    });

    const savedGroup = await group.save();

    //  *** update group field within each contained card
    let promiseArray = contains.map(item =>
        Card.findByIdAndUpdate(item, { group: savedGroup.id }))

    Promise.all(promiseArray).then(
        response.status(201).json(savedGroup)
    )
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
    const groupToDelete = await Group.findById(target)
    let parentDoc = await Document.findById(groupToDelete.document)

    let newCardsAndGroups = ReplaceGroupWithCardsContained(parentDoc, groupToDelete)

    await Document.findByIdAndUpdate(groupToDelete.document, { editorCardsAndGroups: newCardsAndGroups }, { new: true })
    await Group.findByIdAndRemove(target);
    response.status(204).send(`Group deleted : ${target}`);
};

const ReplaceGroupWithCardsContained = (parentDoc, groupToDelete) => {
    let newCardsAndGroups = []
    let cardsAndGroupsItem = [];

    for (element of parentDoc.editorCardsAndGroups) {
        if (element.item == groupToDelete.id) {
            groupToDelete.contains.forEach((containedItem) => {
                cardsAndGroupsItem = [{ item: containedItem, cardOrGroup: 'Card' }]
                newCardsAndGroups = addToArray(newCardsAndGroups, cardsAndGroupsItem)
            })
        } else {
            newCardsAndGroups = addToArray(newCardsAndGroups, element)
        }
    }
    return newCardsAndGroups
}

/**
 * Update group with PUT method from '/api/group/:id'
 *
 * @param {*} request
 * @param {*} response
 *
 * @return Status 200
 */
module.exports.updateGroupByID = (request, response, next) => {
    const { contains, document, indentation, title } = request.body
    const target = request.params.id

    console.log("contains.length", contains.length);

    const group = {
        contains: contains,
        document: document,
        indentation: indentation,
        title: title
    }

    let oldGroup = Group.findById(target)
    if (oldGroup.document != document) {
        console.log("group changed doc");
        // ** update old and new doc
    }

    Group.findByIdAndUpdate(target, group, { new: true })
        .then(updatedGroup => {
            response.json(updatedGroup)
        })
        .catch(error => next(error))
};
