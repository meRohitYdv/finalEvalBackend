const axios = require('axios');

module.exports = async function (req, res, next){
    try{
        const {data} = await axios({
                method: 'post',
                url: 'http://localhost:8080/verifyJWT',
                headers: {}, 
                data: {
                  token: req.header('x-auth-token')
                }
        });
        req.user = data;
        next();
    } catch(ex){
        if(ex.response?.status===401)
            res.status(401).send('Invalid token.');
        else if(ex.response?.status)
            res.status(ex.response.status).send('Something Went Wrong');
        else
            res.status(500).send('Internal Server Error');
    }
};