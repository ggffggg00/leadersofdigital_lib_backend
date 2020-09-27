const express = require('express');
const router = express.Router();

const pgp = require("pg-promise")();
const db = pgp("postgres://postgres:1324@localhost:5432/libNavigation");

router.get('/', function (req, res, next) {
    db.any('SELECT id_floor, floor_number FROM dic."Dic_Floors"')
        .then(function (d) {
            success(res, d)
        })
        .catch(function (err) {
            console.log("ERROR:", err);
            error(res, err);
        });
});

router.get('/:uid', function (req, res, next) {
    let response = {
        floor_id: "",
        floor_number: "d.floor_number",
        plan_id: "d.plan",
        nodes: [],
        edges: []
    }
    let pr1 = db.one('SELECT * FROM dic."Dic_Floors" WHERE dic."Dic_Floors".id_floor = $1', [req.params.uid])
        .then(function (d) {
            response = {
                floor_id: d["id_floor"],
                floor_number: d.floor_number,
                plan_id: d.plan
            }
        })

    let pr2 = db.any('SELECT * FROM gr.nodes WHERE gr.nodes.floor_id = $1', [req.params.uid])
        .then(function (d) {
            response.nodes = d;
        })

    let pr3 = db.any('SELECT DISTINCT edge_id, start_node_id, end_node_id FROM gr.edges'+
    ' inner join gr.nodes ND on gr.edges.start_node_id = ND.node_id OR gr.edges.end_node_id = ND.node_id'+
    ' WHERE ND.floor_id =', [req.params.uid])
        .then(function (d) {
            response.edges = d;
        })

    Promise.all([pr1,pr2,pr3])
        .then(()=>success(res, response))
        .catch((err)=>{
            console.log("ERROR:", err);
            error(res, err);
        })

});

function error(res, msg) {
    res.statusCode = 400;
    res.send({
        status: "error",
        msg: msg
    })
}

function success(res, data) {
    res.statusCode = 200;
    res.send({
        status: "ok",
        data: data
    })
}

module.exports = router;
