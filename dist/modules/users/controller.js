'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginWithAuth0 = undefined;

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const loginWithAuth0 = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const args = _objectWithoutProperties(req.body, []);

    try {
      const user = yield _model2.default.create(args);

      return res.status(200).json({
        user
      });
    } catch (e) {
      return res.status(400).json({ error: true, errorMessage: 'Something wrong with auth' });
    }
  });

  return function loginWithAuth0(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
exports.loginWithAuth0 = loginWithAuth0;