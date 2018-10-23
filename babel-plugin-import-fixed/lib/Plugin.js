"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _path2 = require("path");

var _helperModuleImports = require("@babel/helper-module-imports");

function camel2Dash(_str) {
  var str = _str[0].toLowerCase() + _str.substr(1);

  return str.replace(/([A-Z])/g, function ($1) {
    return "-".concat($1.toLowerCase());
  });
}

function camel2Underline(_str) {
  var str = _str[0].toLowerCase() + _str.substr(1);

  return str.replace(/([A-Z])/g, function ($1) {
    return "_".concat($1.toLowerCase());
  });
}

function winPath(path) {
  return path.replace(/\\/g, '/');
}

var Plugin =
/*#__PURE__*/
function () {
  function Plugin(libraryName, libraryDirectory, style, camel2DashComponentName, camel2UnderlineComponentName, fileName, customName, transformToDefaultImport, types) {
    var index = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
    (0, _classCallCheck2.default)(this, Plugin);
    this.libraryName = libraryName;
    this.libraryDirectory = typeof libraryDirectory === 'undefined' ? 'lib' : libraryDirectory;
    this.camel2DashComponentName = typeof camel2DashComponentName === 'undefined' ? true : camel2DashComponentName;
    this.camel2UnderlineComponentName = camel2UnderlineComponentName;
    this.style = style || false;
    this.fileName = fileName || '';
    this.customName = customName;
    this.transformToDefaultImport = typeof transformToDefaultImport === 'undefined' ? true : transformToDefaultImport;
    this.types = types;
    this.pluginStateKey = "importPluginState".concat(index);
  }

  (0, _createClass2.default)(Plugin, [{
    key: "getPluginState",
    value: function getPluginState(state) {
      if (!state[this.pluginStateKey]) {
        state[this.pluginStateKey] = {}; // eslint-disable-line
      }

      return state[this.pluginStateKey];
    }
  }, {
    key: "isInGlobalScope",
    value: function isInGlobalScope(path, name, pluginState) {
      var parentPath = path.findParent(function (_path) {
        return _path.scope.hasOwnBinding(pluginState.specified[name]);
      });
      return !!parentPath && parentPath.isProgram();
    }
  }, {
    key: "importMethod",
    value: function importMethod(methodName, file, pluginState) {
      if (!pluginState.selectedMethods[methodName]) {
        var libraryDirectory = this.libraryDirectory;
        var style = this.style;
        var transformedMethodName = this.camel2UnderlineComponentName // eslint-disable-line
        ? camel2Underline(methodName) : this.camel2DashComponentName ? camel2Dash(methodName) : methodName;
        var path = winPath(this.customName ? this.customName(transformedMethodName) : (0, _path2.join)(this.libraryName, libraryDirectory, transformedMethodName, this.fileName) // eslint-disable-line
        );
        pluginState.selectedMethods[methodName] = this.transformToDefaultImport // eslint-disable-line
        ? (0, _helperModuleImports.addDefault)(file.path, path, {
          nameHint: methodName
        }) : (0, _helperModuleImports.addNamed)(file.path, methodName, path);

        if (style === true) {
          (0, _helperModuleImports.addSideEffect)(file.path, "".concat(path, "/style"));
        } else if (style === 'css') {
          (0, _helperModuleImports.addSideEffect)(file.path, "".concat(path, "/style/css"));
        } else if (typeof style === 'function') {
          var stylePath = style(path, file);

          if (stylePath) {
            (0, _helperModuleImports.addSideEffect)(file.path, stylePath);
          }
        }
      }

      return Object.assign({}, pluginState.selectedMethods[methodName]);
    }
  }, {
    key: "buildExpressionHandler",
    value: function buildExpressionHandler(node, props, path, state) {
      var _this = this;

      var file = path && path.hub && path.hub.file || state && state.file;
      var types = this.types;
      var pluginState = this.getPluginState(state);
      props.forEach(function (prop) {
        if (!types.isIdentifier(node[prop])) return;

        if (pluginState.specified[node[prop].name]) {
          node[prop] = _this.importMethod(pluginState.specified[node[prop].name], file, pluginState); // eslint-disable-line
        }
      });
    }
  }, {
    key: "buildDeclaratorHandler",
    value: function buildDeclaratorHandler(node, prop, path, state) {
      var file = path && path.hub && path.hub.file || state && state.file;
      var types = this.types;
      var pluginState = this.getPluginState(state);
      if (!types.isIdentifier(node[prop])) return;

      if (pluginState.specified[node[prop].name] && path.scope.hasBinding(node[prop].name) && path.scope.getBinding(node[prop].name).path.type === 'ImportSpecifier') {
        node[prop] = this.importMethod(node[prop].name, file, pluginState); // eslint-disable-line
      }
    }
  }, {
    key: "ProgramEnter",
    value: function ProgramEnter(path, state) {
      var pluginState = this.getPluginState(state);
      pluginState.__ProgramEnterFileName = state.file.opts.filename;
      console.log('\nProgramEnter: ' + pluginState.__ProgramEnterFileName);
      pluginState.specified = Object.create(null);
      pluginState.libraryObjs = Object.create(null);
      pluginState.selectedMethods = Object.create(null);
      pluginState.pathsToRemove = [];
    }
  }, {
    key: "ProgramExit",
    value: function ProgramExit(path, state) {
      var pluginState = this.getPluginState(state);
      const mayBeHasError = state.file.opts.filename !== pluginState.__ProgramEnterFileName;
      console.log('\n' + (mayBeHasError ? '\n【Error!!】' : '(ok)') + 'ProgramExit: ' + state.file.opts.filename + (mayBeHasError ? '\n' : ''));
      pluginState.pathsToRemove.forEach(function (p) {
        return !p.removed && p.remove();
      });
    }
  }, {
    key: "ImportDeclaration",
    value: function ImportDeclaration(path, state) {
      var node = path.node; // path maybe removed by prev instances.

      if (!node) return;
      var value = node.source.value;
      var libraryName = this.libraryName;
      var types = this.types;
      var pluginState = this.getPluginState(state);

      if (value === libraryName) {
        node.specifiers.forEach(function (spec) {
          if (types.isImportSpecifier(spec)) {
            pluginState.specified[spec.local.name] = spec.imported.name;
          } else {
            pluginState.libraryObjs[spec.local.name] = true;
          }
        });
        pluginState.pathsToRemove.push(path);
      }
    }
  }, {
    key: "CallExpression",
    value: function CallExpression(path, state) {
      var _this2 = this;

      var node = path.node;
      var file = path && path.hub && path.hub.file || state && state.file;
      var name = node.callee.name;
      var types = this.types;
      var pluginState = this.getPluginState(state);

      if (types.isIdentifier(node.callee)) {
        if (pluginState.specified[name]) {
          node.callee = this.importMethod(pluginState.specified[name], file, pluginState);
        }
      }

      node.arguments = node.arguments.map(function (arg) {
        var argName = arg.name;

        if (pluginState.specified[argName] && path.scope.hasBinding(argName) && path.scope.getBinding(argName).path.type === 'ImportSpecifier') {
          return _this2.importMethod(pluginState.specified[argName], file, pluginState);
        }

        return arg;
      });
    }
  }, {
    key: "MemberExpression",
    value: function MemberExpression(path, state) {
      var node = path.node;
      var file = path && path.hub && path.hub.file || state && state.file;
      var pluginState = this.getPluginState(state); // multiple instance check.

      if (!node.object || !node.object.name) return;

      if (pluginState.libraryObjs[node.object.name]) {
        // antd.Button -> _Button
        path.replaceWith(this.importMethod(node.property.name, file, pluginState));
      } else if (pluginState.specified[node.object.name]) {
        node.object = this.importMethod(pluginState.specified[node.object.name], file, pluginState);
      }
    }
  }, {
    key: "Property",
    value: function Property(path, state) {
      var node = path.node;
      this.buildDeclaratorHandler(node, 'value', path, state);
    }
  }, {
    key: "VariableDeclarator",
    value: function VariableDeclarator(path, state) {
      var node = path.node;
      this.buildDeclaratorHandler(node, 'init', path, state);
    }
  }, {
    key: "ArrayExpression",
    value: function ArrayExpression(path, state) {
      var node = path.node;
      var props = node.elements.map(function (_, index) {
        return index;
      });
      this.buildExpressionHandler(node.elements, props, path, state);
    }
  }, {
    key: "LogicalExpression",
    value: function LogicalExpression(path, state) {
      var node = path.node;
      this.buildExpressionHandler(node, ['left', 'right'], path, state);
    }
  }, {
    key: "ConditionalExpression",
    value: function ConditionalExpression(path, state) {
      var node = path.node;
      this.buildExpressionHandler(node, ['test', 'consequent', 'alternate'], path, state);
    }
  }, {
    key: "IfStatement",
    value: function IfStatement(path, state) {
      var node = path.node;
      this.buildExpressionHandler(node, ['test'], path, state);
      this.buildExpressionHandler(node.test, ['left', 'right'], path, state);
    }
  }, {
    key: "ExpressionStatement",
    value: function ExpressionStatement(path, state) {
      var node = path.node;
      var types = this.types;

      if (types.isAssignmentExpression(node.expression)) {
        this.buildExpressionHandler(node.expression, ['right'], path, state);
      }
    }
  }, {
    key: "ReturnStatement",
    value: function ReturnStatement(path, state) {
      var types = this.types;
      var file = path && path.hub && path.hub.file || state && state.file;
      var node = path.node;
      var pluginState = this.getPluginState(state);

      if (node.argument && types.isIdentifier(node.argument) && pluginState.specified[node.argument.name] && this.isInGlobalScope(path, node.argument.name, pluginState)) {
        node.argument = this.importMethod(node.argument.name, file, pluginState);
      }
    }
  }, {
    key: "ExportDefaultDeclaration",
    value: function ExportDefaultDeclaration(path, state) {
      var node = path.node;
      this.buildExpressionHandler(node, ['declaration'], path, state);
    }
  }, {
    key: "BinaryExpression",
    value: function BinaryExpression(path, state) {
      var node = path.node;
      this.buildExpressionHandler(node, ['left', 'right'], path, state);
    }
  }, {
    key: "NewExpression",
    value: function NewExpression(path, state) {
      var node = path.node;
      this.buildExpressionHandler(node, ['callee', 'arguments'], path, state);
    }
  }]);
  return Plugin;
}();

exports.default = Plugin;