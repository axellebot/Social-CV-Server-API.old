"use strict";

// Schemas
const User = require('../models/user.model');

// Constants
const messages = require('@constants/messages');
const statuses = require('@constants/statuses');
const models = require('@constants/models');
const roles = require('@constants/roles');
const parameters = require('@constants/parameters');
const fields = require('@constants/fields');

// Errors
const DatabaseFindError = require('@errors/DatabaseFindError');
const DatabaseCountError = require('@errors/DatabaseCountError');
const DatabaseCreateError = require('@errors/DatabaseCreateError');
const DatabaseUpdateError = require('@errors/DatabaseUpdateError');
const DatabaseRemoveError = require('@errors/DatabaseRemoveError');
const MissingPrivilegeError = require('@errors/MissingPrivilegeError');
const NotFoundError = require('@errors/NotFoundError');
const NotImplementedError = require('@errors/NotImplementedError');

// Responses
const SelectDocumentsResponse = require('@responses/SelectDocumentsResponse');
const SelectDocumentResponse = require('@responses/SelectDocumentResponse');
const CreateDocumentResponse = require('@responses/CreateDocumentResponse');
const UpdateDocumentsResponse = require('@responses/UpdateDocumentsResponse');
const UpdateDocumentResponse = require('@responses/UpdateDocumentResponse');
const DeleteDocumentsResponse = require('@responses/DeleteDocumentsResponse');
const DeleteDocumentResponse = require('@responses/DeleteDocumentResponse');


exports.findUser = (req, res, next) => {
  const id = req.user._id;

  User
    .findById(id)
    .select(fields.FIELDS_USER_PUBLIC)
    .then((user) => {
      if (!user) throw new NotFoundError(models.MODEL_NAME_USER);
      res.json(new SelectDocumentResponse(user));
    })
    .catch((err) => {
      next(err);
    });
}



exports.findFull = (req, res, next) => {
  const id = req.user._id;

  User
    .findById(id)
    .select(fields.FIELDS_USER_PUBLIC)
    .populate({
      path: 'profiles',
      populate: {
        path: 'parts',
        populate: {
          path: 'groups',
          populate: {
            path: 'entries'
          }
        }
      }
    })
    .then((userPopulate) => {
      if (!userPopulate) throw new NotFoundError(models.MODEL_NAME_USER);
      res.json(new SelectDocumentResponse(userPopulate));
    })
    .catch((err) => {
      next(err);
    });
}