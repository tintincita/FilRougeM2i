

// returns a promise
module.exports.isGroup = (an_id) => {
    return Group.findById(an_id).then((res) => res)
}

// returns a promise
module.exports.isCard = (an_id) => {
    return Card.findById(an_id).then((res) => res)
}

module.exports.objectListToArray = (object) => {
    return Object.values(object).map((id) => String(id))
}