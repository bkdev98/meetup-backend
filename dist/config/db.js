'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => {
    _mongoose2.default.Promise = global.Promise;
    _mongoose2.default.connect('mongodb://localhost/meetup');
    _mongoose2.default.connection.once('open', () => console.log('Mongodb running')).on('error', err => console.error(err));
};