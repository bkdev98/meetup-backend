'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const GroupSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Name must be 5 characters long']
  },
  description: {
    type: String,
    required: true,
    minlength: [10, 'Description must be 10 characters long']
  },
  category: {
    type: String
  },
  meetups: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Meetup'
  }]
}, { timestamps: true });

/**
 * Create a meetup and add it to the meetups array in the group
 */
GroupSchema.statics.addMeetup = (() => {
  var _ref = _asyncToGenerator(function* (id, args) {
    const Meetup = _mongoose2.default.model('Meetup');

    const meetup = yield new Meetup(Object.assign({}, args, { group: id }));

    yield this.findByIdAndUpdate(id, { $push: { meetups: meetup.id } });

    return {
      meetup: yield meetup.save()
    };
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = _mongoose2.default.model('Group', GroupSchema);