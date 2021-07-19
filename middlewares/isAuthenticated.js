const jwt = require('express-jwt')

function extraxtTokenFromHeaders(req,res){
    if(!req.headers.authorization){
        throw new Erroe('Cabeçalho incvalido')
    }

    return req.headers.authorization.split(' ')[1]
}

module.exports = jwtt({
    secret: process.env.TOken_sign_secret,
    //nao entendi ??
    userProperty: "user",
    getToken: extractTokenFromHeaders,
       algorithms:["HS256"]

})