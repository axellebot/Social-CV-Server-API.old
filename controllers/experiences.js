var getPagination = require("../helpers").getPagination;

const Experience = require('../models/experience.schema');

/* Experiences page. */
exports.experiences = {};
exports.experiences.get = function (req, res, next) {
    //TODO : Experiences - Handle options
    var pagination = getPagination(req);
    Experience
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, experiences) {
            if (err) return next(err);
            res.json({data: experiences});
        });
};
exports.experiences.post = function (req, res, next) {
    //TODO : Experiences - Create experience
    res.status(404).send('Create a Experience');
};
exports.experiences.put = function (req, res, next) {
    //TODO : Experiences - Add Bulk update
    res.status(404).send('Bulk update of experiences');
};
exports.experiences.delete = function (req, res, next) {
    //TODO : Experiences - Remove all experiences
    res.status(404).send('Remove all experiences');
};

/* Experience page. */
exports.experience = {};
exports.experience.get = function (req, res, next) {
    Experience
        .findById(req.params.id)
        .exec(function (err, experience) {
            if (err) return next(err);
            res.json({data: experience});
        });
};
exports.experience.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.experience.put = function (req, res, next) {
    //TODO : Experience - Update experience
    res.status(404).send('Bulk update of experiences');
};
exports.experience.delete = function (req, res, next) {
    //TODO : Experience - Remove experience
    res.status(404).send('Remove experience');
};