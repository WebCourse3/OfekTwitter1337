'use strict';

var dal = require('../dal/dal');
var https = require('https');
var express = require('express');
var router = express.Router();
var request = require('request');


router.route('/visitors')
    .get(function (req, res, next) {
        dal.visitors.list(req.params, function (err, result) {
            res.json(result);
        });
    })
    .post(function (req, res, next) {
        next(new Error('not implemented'));
    });