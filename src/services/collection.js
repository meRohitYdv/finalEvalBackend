/* eslint-disable no-unused-vars */
const CollectionsTable = require('../models').collection;
const ContentsTable = require('../models').content;


async function createCollection(requestBody){
    const {contentName} = requestBody;
    const content = await ContentsTable.findOne({
        where:{
            contentName: contentName
        }
    });
    if(content===null)
    return "given content dosen't exist";

    let collectionData = {};
    let contentFields = content.dataValues.contentFields;
    for (const [key, value] of Object.entries(contentFields)) {
        collectionData[value] = (requestBody[value]) ? requestBody[value] : "";
    }

    const newCollection = {contentName: contentName, collectionData: collectionData};
    await CollectionsTable.create(newCollection);
    return newCollection;
}

module.exports = { createCollection };