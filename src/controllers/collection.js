const services = require("../services/collection.js");

async function createCollection(req, res){
    try{
        const collection = await services.createCollection(req.body);
        if(collection==="given content dosen't exist")
            return res.status(400).send(collection);
        return res.status(200).send(collection);
    }catch(e){
        console.log(e);
        return res.status(500).send("Something went wrong.");
    }
}

async function updateCollection(req, res){
    try{
        const collection = await services.updateCollection(req.body);
        if(collection==="given content dosen't exist")
            return res.status(400).send(collection);
        return res.status(200).send(collection);
    }catch(e){
        console.log(e);
        return res.status(500).send("Something went wrong.");
    }
}

async function deleteCollection(req, res){
    try{
        const result = await services.deleteCollection(req.params.id);
        return res.status(200).send(result);
    }catch(e){
        console.log(e);
        return res.status(500).send("Something went wrong.");
    }
}

async function getCollections(req, res){
    try{
        const result = await services.getCollections(req.params.contentName);
        return res.status(200).send(result);
    }catch(e){
        console.log(e);
        return res.status(500).send("Something went wrong.");
    }
}

module.exports = {createCollection, updateCollection, deleteCollection, getCollections};