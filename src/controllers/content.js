const services = require("../services/content.js");

async function createContent(req, res){
    try{
        const contentName = await services.createContent(req.body.name);
        if(contentName==="content already exists")
            return res.status(400).send("content already exists");
        return res.status(200).send({contentName: contentName});
    }catch(e){
        console.log(e);
        return res.status(500).send("Something went wrong.");
    }
}

async function getAllContents(req, res){
    try{
        const contents = await services.getAllContents();
        return res.status(200).send(contents);
    }
    catch(e){
        console.log(e);
        return res.status(500).send("Something went wrong.");
    }
}

async function addFieldToContent(req, res){
    try{
        const result = await services.addFieldToContent(req.body);
        if(result==="content with given name doesn't exist" || result==="content already has specified field")
            return res.status(400).send(result);
        return res.status(200).send(result);
    }
    catch(e){
        console.log(e);
        return res.status(500).send("Something went wrong.");
    }
}

async function deleteFieldFromContent(req, res){
    try{
        const result = await services.deleteFieldFromContent(req.body);
        if(result==="content with given name doesn't exist")
            return res.status(400).send(result);
        return res.status(200).send(result);
    }
    catch(e){
        console.log(e);
        return res.status(500).send("Something went wrong.");
    }
}

async function getfieldsFromContentName(req, res){
    try{
        const result = await services.getfieldsFromContentName(req.params.contentName);
        return res.status(200).send(result);
    }
    catch(e){
        console.log(e);
        return res.status(500).send("Something went wrong.");
    }
}

async function updateName(req, res){
    try{
        const result = await services.updateName(req.body);
        return res.status(200).send(result);
    }catch(e){
        console.log(e);
        return res.status(500).send("Something went wrong.");
    }
}

async function updateField(req, res){
    try{
        const result = await services.updateField(req.body);
        if(result==="unable to update as content instances are present")
            return res.status(400).send(result);
        return res.status(200).send(result);
    }catch(e){
        console.log(e);
        return res.status(500).send("Something went wrong.");
    }
}


module.exports = {createContent, getAllContents, addFieldToContent, deleteFieldFromContent, getfieldsFromContentName, updateName, updateField};