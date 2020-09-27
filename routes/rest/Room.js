const express = require('express');
const router = express.Router();

var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:1324@localhost:5432/libNavigation");


router.get('/', function(req, res, next) {

    db.any("SELECT * FROM dic.\"Dic_Rooms\"")
        .then(function (data) {
            success(res, data)
        })
        .catch(function (error) {
            console.log("ERROR:", error);
            error(res,error,500);
        });

});

router.post('/', function(req, res, next) {

    let data = req.body

    db.none("INSERT INTO dic.\"Dic_Rooms\"(number, floor_id, plan_path) VALUES ($1, %2, %3)",[data.number, data.floor, data.plan])
        .then(function (data) {
            success(res, data)
        })
        .catch(function (error) {
            console.log("ERROR:", error);
            error(res,error,500);
        });
});

function error(res, msg, code = 400){
    res.statusCode = code;
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
