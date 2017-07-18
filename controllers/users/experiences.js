"use strict";

const Experience = require('../../models/experience.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Experiences page. */
exports.get = function (req, res, next) {
    //TODO : Experiences - Handle options
    Experience
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, experiences) {
            if (err) return next(err);
            res.json({data: experiences});
        });
};
exports.post = function (req, res, next) {
    //TODO : Experiences - Create experience for user
    res.status(404).send('Create a new Experience for user : '+req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : Experiences - Add Bulk update for user
    res.status(404).send('Bulk update of experiences for user : '+req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    Experience
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};