const express = require('express');
const router = express.Router();
const utils = require('../common/utils');
const database = require('../common/database');
const auth = require('../common/auth');

// User login
router.post('/login', async function (req, res, next) {
    try {
        let params = [req.body.gid];
        let result = await database.QueryMySQL('SELECT id from bk_user where gid = ?', params);

        //User exists, update information
        if (result.length) {
            params = [req.body.fname, req.body.gname, req.body.xname,
                req.body.head, req.body.email, req.body.gid];
            await database.QueryMySQL('UPDATE bk_user SET `fname` = ?, `gname` = ?, ' +
                '`xname` = ?, `head` =? , `email` = ? WHERE `gid` = ?', params);

            req.session.gid = req.body.gid;
            return utils.SendResult(res);
        }

        //User does not exists, insert to user table
        params = [req.body.gid, req.body.fname, req.body.gname,
            req.body.xname, req.body.head, req.body.email];
        await database.QueryMySQL('INSERT INTO bk_user( `gid`, `fname`, `gname`, ' +
            '`xname`, `head`, `email`) VALUES(?, ?, ?, ?, ?, ?)', params);

        req.session.gid = req.body.gid;
        return utils.SendResult(res);
    } catch (e) {
        utils.SendError(res, e);
    }
});

// Get the current user's information
router.post('/profile', auth, async function (req, res, next) {
    try {
        let params = [req.session.gid];
        let result = await database.QueryMySQL('SELECT fname, gname, xname, head, email ' +
            'from bk_user where gid = ?', params);
        return utils.SendResult(res, result);
    } catch (e) {
        utils.SendError(res, e);
    }
});

module.exports = router;