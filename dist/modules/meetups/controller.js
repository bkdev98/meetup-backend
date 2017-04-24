'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllMeetups = exports.createMeetup = undefined;

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const createMeetup = exports.createMeetup = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    var _req$body = req.body;
    const title = _req$body.title,
          description = _req$body.description;

    const newMeetup = new _model2.default({ title, description });

    try {
      return res.status(201).json({ meetup: yield newMeetup.save() });
    } catch (e) {
      return res.status(e.status).json({ error: true, message: 'Error with Meetup' });
    }
  });

  return function createMeetup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const getAllMeetups = exports.getAllMeetups = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      return res.status(200).json({ meetups: yield _model2.default.find({}) });
    } catch (e) {
      return res.status(e.status).json({ error: true, message: 'Error with Meetup' });
    }
  });

  return function getAllMeetups(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();