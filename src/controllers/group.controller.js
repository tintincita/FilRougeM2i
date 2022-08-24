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
    console.log(request.body);
    const { contains, document } = request.body;

    const parentDocument = await Document.findById(document);
    console.log(request.body);
    const group = new Group({
        contains: contains,
        document: document,
    });

    const savedGroup = await group.save();

    // console.log(parentDocument.cardsAndGroups);
    // await parentDocument.save();

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
    await Group.findByIdAndRemove(target);
    // await Document.updateOne({ cards: target}, {$pull: { cards: target}});
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
    const {contains, document} = request.body

    const group = {
        contains: contains,
        document: document,
    }

    Group.findByIdAndUpdate(request.params.id, group, { new: true })
        .then(updatedGroup => {
            response.json(updatedGroup)
        })
        .catch(error => next(error))
};
