/*
* Copyright (c) 2010-2021, James Liu
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions
* are met:
*
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in
*       the documentation and/or other materials provided with the distribution.
*     * Neither the name of Tit Software nor the names of its
*       contributors may be used to endorse or promote products derived
*       from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

const fs = require("fs");
const path = require('path');
const crypto = require('crypto');
const error_code = require('./error_code');

let Utils = {
    //Format DateTime String
    dateFtt: function (fmt, date) {
        let o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    crtTimeFtt: function () {
        let crtTime = new Date();
        return this.dateFtt("yyyy-MM-dd hh:mm:ss", crtTime);
    },
    crtTimeMs: function () {
        let crtTime = new Date();
        return this.dateFtt("hh-mm-ss-S", crtTime);
    },
    crtTimeDate: function () {
        let crtTime = new Date();
        return this.dateFtt("yyyy-MM-dd", crtTime);
    },
    mkdirsSync: function (dirpath, mode) {
        if (!fs.existsSync(dirpath)) {
            let pathtmp;
            dirpath.split(path.sep).forEach(function (dirname) {
                if (dirname === "") {
                    dirname = "/"
                }
                if (pathtmp) {
                    pathtmp = path.join(pathtmp, dirname);
                } else {
                    pathtmp = dirname;
                }
                if (!fs.existsSync(pathtmp)) {
                    if (!fs.mkdirSync(pathtmp, mode)) {
                        return false;
                    }
                }
            });
        }
        return true;
    },
    SendResult: function (res, data) {
        let result = {
            code: error_code.error_success.code,
            message: error_code.error_success.message,
        };

        if (typeof (data) === 'object') {
            result.data = data;
        }

        res.send(result);
    },
    SendError: function (res, err) {
        let result = {
            code: err && err.code ? err.code : error_code.error_unknown.code,
            message: err && err.message ? err.message : error_code.error_unknown.message,
        };
        res.send(result);
    },
    CalcFileMD5: function (filePath) {
        return new Promise(function (resolve, reject) {
            const stream = fs.createReadStream(filePath);
            const hash = crypto.createHash('md5');
            stream.on('data', chunk => {
                hash.update(chunk, 'utf8');
            });
            stream.on('end', () => {
                const md5 = hash.digest('hex');
                stream.close();
                resolve(md5);
            });
            stream.on('error', (err) => {
                reject(err);
            });
        })
    },
};

exports = module.exports = Utils;