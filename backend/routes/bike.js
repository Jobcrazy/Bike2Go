const express = require("express");
const router = express.Router();
const utils = require("../common/utils");
const error_code = require("../common/error_code");
const database = require("../common/database");
const auth = require("../common/auth");

router.post("/add", auth, async function (req, res, next) {
    let title = req.body.title;
    let description = req.body.description;
    let photos = JSON.stringify(req.body.photos);
    let location = req.body.location;
    let deposit = req.body.deposit;
    let price = req.body.price;

    // insert data to database
    let insertSQL =
        "INSERT INTO bk_bike (uid, title, description, photos, location, deposit, price) VALUES(?,?,?,?, POINT(?,?), ?, ?)";
    let insertParams = [
        req.session.uid,
        title,
        description,
        photos,
        location.lat,
        location.long,
        deposit,
        price,
    ];

    try {
        await database.QueryMySQL(insertSQL, insertParams);
        return utils.SendResult(res, error_code.error_success);
    } catch (e) {
        return utils.SendResult(res, e);
    }
});

router.post("/find", auth, async function (req, res, next) {
    //Todo:
});

module.exports = router;
