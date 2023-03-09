/* eslint-disable no-unused-vars */
const ContentsTable = require('../models').content;

async function findContent(contentName){
    const content = await ContentsTable.findOne({
        where:{
            contentName: contentName
        }
    });
    return content;
}

async function createContent(contentName){
    const content = await findContent(contentName);
    if(content!==null)
        return "content already exists";
    
    await ContentsTable.create({contentName: contentName, contentFields: []});
    return contentName;
}

async function getAllContents(){
    return await ContentsTable.findAll( { attributes:['contentName'] } );
}

async function addFieldToContent(reqBody){
    const {contentName, fieldName} = reqBody;
    const content = await findContent(contentName);
    if(content===null)
        return "content with given name doesn't exist";
    
    let contentFields = content.dataValues.contentFields;
    
    const updatedFields = [];
    for (const [key, value] of Object.entries(contentFields)) {
        updatedFields.push(value);
    }
    updatedFields.push(fieldName);

    if(contentFields.includes(fieldName))
        return "content already has specified field";
    
    await ContentsTable.update({contentFields: updatedFields}, {where: {contentName: contentName}});
    return {contentName};
}

async function deleteFieldFromContent(reqBody){
    const {contentName, fieldName} = reqBody;
    const content = await findContent(contentName);
    if(content===null)
        return "content with given name doesn't exist";
    
    let contentFields = content.dataValues.contentFields;
    const updatedFields = [];
    for (const [key, value] of Object.entries(contentFields)) {
        if(value!==fieldName)
        updatedFields.push(value);
    }
    
    await ContentsTable.update({contentFields: updatedFields}, {where: {contentName: contentName}});
    return {contentName};
}

async function getfieldsFromContentName(contentName){
    const content = await findContent(contentName);
    if(content===null)
        return "content with given name doesn't exist";
    
    return content.dataValues.contentFields;
}


module.exports = { createContent, getAllContents, addFieldToContent, deleteFieldFromContent, getfieldsFromContentName };