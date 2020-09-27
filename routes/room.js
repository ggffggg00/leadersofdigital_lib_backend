
const express = require('express');
const router = express.Router();

const pgp = require("pg-promise")(/*options*/);
const db = pgp("postgres://postgres:1324@localhost:5432/libNavigation");

router.get('/', function(req, res, next) {
    db.any('SELECT room_id, number FROM dic."Dic_Rooms"')
        .then(function (d) {
            success(res, d)
        })
        .catch(function (err) {
            console.log("ERROR:", err);
            error(res, err);
        });
});

router.get('/:uid', function(req, res, next) {
    db.any('SELECT * FROM dic."Dic_Rooms" LEFT JOIN dic."Dic_Rack" DR on "Dic_Rooms".room_id = DR.room_id WHERE "Dic_Rooms".room_id = $1', [req.params.uid])
        .then(function (d) {

            let response = {
                room_id: d[0]["room_id"],
                number: d[0].number,
                floor_id: d[0].floor_id,
                plan_id: d[0].plan_id,
                racks:[]
            }
            d.forEach((item)=>{
                response.racks.push({
                    rack_id: item.rack_id,
                    rack_number: item.rack_number,
                    schema_x: item.schema_pos.split(";")[0],
                    schema_y: item.schema_pos.split(";")[1]
                })
            })

            success(res, response)
        })
        .catch(function (err) {
            console.log("ERROR:", err);
            error(res, err);
        });
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
