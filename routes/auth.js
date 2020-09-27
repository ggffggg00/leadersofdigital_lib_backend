const express = require('express');
const JWT = require("../shared/JWT");
const router = express.Router();

//TODO Hardcoded credentials
const ADMIN_USERNAME = "Hello Library!"
const ADMIN_PASS = "Hello Library!"
const ADMIN_NAME = "Иванов Иван Иванович"


/* GET auth request */
router.get('/authenticate', function(req, res, next) {
    let username = req.query.username
    let pwd = req.query.pwd

    if(username === undefined || pwd === undefined){
        error(res,"username and pwd GET params required!")
        return;
    }

    if (username !== ADMIN_USERNAME || pwd !== ADMIN_PASS){
        error(res,"Invalid credentials")
        return;
    }

    let token = JWT.generateSignedToken(username, ADMIN_NAME, "ADMIN");

    success({
        token: token,
        username: username,
        role: "ADMIN"
    })
});


function error(res, msg){
    res.statusCode = 400;
    res.send({
        status: "error",
        msg: msg
    })
}

function success(res, data){
    res.statusCode = 200;
    res.send({
        status: "ok",
        data: data
    })
}


module.exports = router;
