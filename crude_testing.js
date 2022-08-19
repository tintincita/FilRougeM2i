const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('./src/config/app')

const Group = require('./src/models/group.model')
const Card = require('./src/models/card.model')
const helper = require('./tests/test_helper')

const main = async () => {

    // let cardObject = new Card()

    // for (let i = 0; i < helper.initialCards.length; i++) {
    //     cardObject = new Card(helper.initialCards[i])
    //     await cardObject.save()
    // }

    let cardsAtStart = await helper.cardsInDb();

    let ids = cardsAtStart.map((p) => p.id);

    let groupObject = new Group();
    groupObject.contains.push(ids[4]);
    console.log(groupObject.contains);


    console.log(ids.slice(6));
    console.log("ids",ids);
}

main();

