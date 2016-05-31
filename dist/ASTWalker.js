'use strict';

/**
 * ASTWalker -
 */

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ASTWalker = function () {
   function ASTWalker() {
      _classCallCheck(this, ASTWalker);
   }

   _createClass(ASTWalker, [{
      key: 'traverse',

      /**
       * Traverses the ast tree provided and invokes `callbacks.enterNode` / `callbacks.exitNode`
       *
       * @param {object|Array}   ast -
       * @param {object}         callbacks - An object hash containing a function for `enterNode` and / or `exitNode` keys.
       */
      value: function traverse(ast, callbacks) {
         if ((typeof callbacks === 'undefined' ? 'undefined' : _typeof(callbacks)) !== 'object') {
            throw new TypeError('Invalid callbacks');
         }
         if (typeof callbacks.enterNode !== 'function' && typeof callbacks.exitNode !== 'function') {
            throw new TypeError('Invalid callbacks - missing `enterNode` and / or `exitNode`.');
         }

         if (Array.isArray(ast)) {
            this._visitNodes(ast, undefined, callbacks);
         } else if ((typeof ast === 'undefined' ? 'undefined' : _typeof(ast)) === 'object') {
            this._visitNode(ast, undefined, callbacks);
         } else {
            throw new TypeError('Invalid syntax tree');
         }
      }

      /**
       * Performs the main node visit invoking the callbacks for entering / exiting the node.
       *
       * @param {object}   node -
       * @param {object}   parent - The parent node.
       * @param {object}   callbacks - An object hash containing a function for `enterNode` and / or `exitNode` keys.
       *
       * @private
       */

   }, {
      key: '_visitNode',
      value: function _visitNode(node, parent, callbacks) {
         if (node !== null && (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && typeof node.type === 'string') {
            var ignoreNodeKeys = typeof callbacks.enterNode === 'function' ? callbacks.enterNode(node, parent) : [];

            this._visitChildren(node, ignoreNodeKeys, callbacks);

            if (typeof callbacks.exitNode === 'function') {
               callbacks.exitNode(node, parent);
            }
         }
      }

      /**
       * Visits all nodes in the given array.
       *
       * @param {object}   nodes -
       * @param {object}   parent - The parent node.
       * @param {object}   callbacks - An object hash containing a function for `enterNode` and / or `exitNode` keys.
       *
       * @private
       */

   }, {
      key: '_visitNodes',
      value: function _visitNodes(nodes, parent, callbacks) {
         var _this = this;

         nodes.forEach(function (node) {
            _this._visitNode(node, parent, callbacks);
         }, this);
      }

      /**
       * Visits all children nodes from a given node.
       *
       * @param {object}   node -
       * @param {Array}    ignoreNodeKeys -
       * @param {object}   callbacks - An object hash containing a function for `enterNode` and / or `exitNode` keys.
       *
       * @private
       */

   }, {
      key: '_visitChildren',
      value: function _visitChildren(node, ignoreNodeKeys, callbacks) {
         var _this2 = this;

         ignoreNodeKeys = Array.isArray(ignoreNodeKeys) ? ignoreNodeKeys : [];

         // Visit all node keys which are an array or an object.
         Object.keys(node).forEach(function (key) {
            // Potentially ignore the given key if it is in the `ignoreNodeKeys` array.
            if (ignoreNodeKeys.indexOf(key) >= 0) {
               return;
            }

            if (Array.isArray(node[key]) || _typeof(node[key]) === 'object') {
               _this2._visitChild(node[key], node, callbacks);
            }
         });
      }

      /**
       * Visits all children nodes from the given child object or array.
       *
       * @param {Array|object}   child -
       * @param {object}         parent - The parent node.
       * @param {object}         callbacks - An object hash containing a function for `enterNode` and / or `exitNode` keys.
       *
       * @private
       */

   }, {
      key: '_visitChild',
      value: function _visitChild(child, parent, callbacks) {
         var visitor = Array.isArray(child) ? this._visitNodes : this._visitNode;
         visitor.call(this, child, parent, callbacks);
      }
   }]);

   return ASTWalker;
}();

exports.default = ASTWalker;
module.exports = exports['default'];