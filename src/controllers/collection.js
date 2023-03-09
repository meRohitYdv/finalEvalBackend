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


module.exports = {createCollection};