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

async function updateCollection(requestBody){
    const {contentName, id} = requestBody;
    const content = await ContentsTable.findOne({
        where:{
            contentName: contentName
        }
    });
    if(content===null)
    return "given content dosen't exist";
    
    const collectionInstance = await CollectionsTable.findOne({where: {id:id}});
    if(collectionInstance===null)
    return "collection with given id dosen't exist";

    let collectionData = {};
    let contentFields = content.dataValues.contentFields;
    for (const [key, value] of Object.entries(contentFields)) {
        collectionData[value] = (requestBody[value]) ? requestBody[value] : "";
    }

    await CollectionsTable.update({collectionData: collectionData}, {where:{id:id} });
    return collectionData;
}

async function deleteCollection(id){
    await CollectionsTable.destroy({ where:{id:id} });
    return id;
}

async function getCollections(contentName){
    return await CollectionsTable.findAll({where: {contentName:contentName }, attributes:["id", "contentName", "collectionData"]});
}

module.exports = { createCollection, updateCollection, deleteCollection, getCollections };