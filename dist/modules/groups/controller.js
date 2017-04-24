'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGroupMeetups = exports.createGroupMeetup = exports.createGroup = undefined;

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _meetups = require('../meetups');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const createGroup = exports.createGroup = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    var _req$body = req.body;
    const name = _req$body.name,
          description = _req$body.description;


    if (!name) {
      return res.status(400).json({ error: true, message: 'Name must be provided!' });
    } else if (typeof name !== 'string') {
      return res.status(400).json({ error: true, message: 'Name must be a string!' });
    } else if (name.length < 5) {
      return res.status(400).json({ error: true, message: 'Name must longer than 5!' });
    }

    if (!description) {
      return res.status(400).json({ error: true, message: 'Description must be provided!' });
    } else if (typeof description !== 'string') {
      return res.status(400).json({ error: true, message: 'Description must be a string!' });
    } else if (description.length < 10) {
      return res.status(400).json({ error: true, message: 'Description must longer than 10!' });
    }

    const group = new _model2.default({ name, description });

    try {
      return res.status(201).json({ error: false, group: yield group.save() });
    } catch (e) {
      return res.status(400).json({ error: true, message: 'Error when created group' });
    }
  });

  return function createGroup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const createGroupMeetup = exports.createGroupMeetup = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var _req$body2 = req.body;
    const title = _req$body2.title,
          description = _req$body2.description;
    const groupId = req.params.groupId;


    if (!title) {
      return res.status(400).json({ error: true, message: 'Title must be provided!' });
    } else if (typeof title !== 'string') {
      return res.status(400).json({ error: true, message: 'Title must be a string!' });
    } else if (title.length < 5) {
      return res.status(400).json({ error: true, message: 'Title must longer than 5!' });
    }

    if (!description) {
      return res.status(400).json({ error: true, message: 'Description must be provided!' });
    } else if (typeof description !== 'string') {
      return res.status(400).json({ error: true, message: 'Description must be a string!' });
    } else if (description.length < 10) {
      return res.status(400).json({ error: true, message: 'Description must longer than 10!' });
    }

    if (!groupId) {
      return res.status(400).json({ error: true, message: 'Group id must be provided' });
    }

    try {
      var _ref3 = yield _model2.default.addMeetup(groupId, { title, description });

      const meetup = _ref3.meetup;


      return res.status(201).json({ error: false, meetup });
    } catch (e) {
      return res.status(400).json({ error: true, message: 'Meetup cannot be created!' });
    }
  });

  return function createGroupMeetup(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

const getGroupMeetups = exports.getGroupMeetups = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    const groupId = req.params.groupId;


    if (!groupId) {
      return res.status(400).json({ error: true, message: 'You need to provided a group id' });
    }

    //  Search for see if group exist
    const group = yield _model2.default.findById(groupId);

    if (!group) {
      return res.status(404).json({ error: true, message: 'Group not exist' });
    }

    try {
      return res.status(200).json({
        error: false,
        meetups: yield _meetups.Meetup.find({ group: groupId }).populate('group', 'name')
      });
    } catch (e) {
      return res.status(400).json({ error: true, message: 'Cannot fetch meetup' });
    }
  });

  return function getGroupMeetups(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
})();