var express = require('express');
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get('/:sid', function(req, res, next) {
    res.sendFile(__dirname.replace("routes", "public")+"/images/"+req.params.sid+".png")
});



module.exports = router;
