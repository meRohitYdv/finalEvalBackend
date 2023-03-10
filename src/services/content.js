/* eslint-disable no-unused-vars */
const ContentsTable = require('../models').content;
const CollectionsTable = require('../models').collection;

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

async function updateName(reqBody){
    const {contentName, newContentName} = reqBody;
    await ContentsTable.update({contentName: newContentName}, {where: {contentName: contentName}});
    await CollectionsTable.update({contentName: newContentName}, {where: {contentName: contentName}});
    return newContentName;
}

async function updateField(reqBody){
    const {fieldName, newFieldName, contentName} = reqBody;
    
    const collections = await CollectionsTable.findOne({where:{contentName: contentName}});
    if(collections)
        return "unable to update as content instances are present";
    
    await deleteFieldFromContent(reqBody);
    reqBody.fieldName = newFieldName;
    await addFieldToContent(reqBody);
    return "field updated";
}
async function deleteContent(contentName){
    await CollectionsTable.destroy({where: {contentName: contentName}});
    await ContentsTable.destroy({where: {contentName: contentName}});
}


module.exports = { createContent, getAllContents, addFieldToContent, deleteFieldFromContent, getfieldsFromContentName, updateName, updateField, deleteContent };