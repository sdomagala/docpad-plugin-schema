'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (BasePlugin) {

  return function (_BasePlugin) {
    _inherits(BaseClass, _BasePlugin);

    function BaseClass() {
      var _Object$getPrototypeO;

      _classCallCheck(this, BaseClass);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(BaseClass)).call.apply(_Object$getPrototypeO, [this].concat(args)));
    }

    _createClass(BaseClass, [{
      key: 'generateBefore',
      value: function generateBefore(opts, next) {
        var docpad = this.docpad;

        var config = this.getConfig();

        if (!config) {
          console.log('There is no schema given!');
          return next();
        }

        var collections = Object.keys(config);

        collections.forEach(function (col) {
          var currentCol = docpad.getCollection(col).toJSON();

          var schema = config[col];

          currentCol.forEach(function (record) {
            var isValidated = (0, _jsonschema.validate)(record.meta, schema);

            if (isValidated.errors && isValidated.errors.length) {
              docpad.getFile({
                _id: record._id
              }).setMeta({
                write: false,
                render: false
              });
            }
          });
        });

        next();
      }
    }, {
      key: 'name',
      get: function get() {
        return 'schema';
      }
    }]);

    return BaseClass;
  }(BasePlugin);
};

var _jsonschema = require('jsonschema');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = exports['default'];