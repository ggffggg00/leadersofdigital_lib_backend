const express = require('express');
const router = express.Router();

var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:1324@localhost:5432/libNavigation");

router.post('/updateFloor', function (req, res, next) {

    let data = req.body;

    let str = "";
    data.nodes.forEach((item, index) => {
        str += "(" + item.x + ", " + item.y + ", " + data.id + ", '" + item.type + "'),";
    })
    str = str.substring(0, str.length - 1);

    console.info("INSERT INTO gr.nodes(node_x, node_y, floor_id, type) VALUES " + str)


    db.any("INSERT INTO gr.nodes(node_x, node_y, floor_id, type) VALUES " + str + "RETURNING node_id")
        .then(function (d) {

            d.forEach((it, index)=>{
                data.nodes[index].db_id=it.node_id;
            })

            data.edges.forEach((item) => {
                db.none("INSERT INTO gr.edges(start_node_id, end_node_id) VALUES  ($1, $2)", [data.nodes[item.start].db_id, data.nodes[item.y].db_id])
                    .then(function () {
                    })
                    .catch(function (error) {
                        console.log("ERROR:", error);
                        error(res, error, 500);
                    });
            })

        })
        .catch(function (error) {
            console.log("ERROR:", error);
            error(res, error, 500);
        });
return

    res.send(data);


});


module.exports = router;
