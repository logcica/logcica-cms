"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationshipsAsObjectID = void 0;
var webpack_1 = require("./webpack");
var beforeChange_1 = require("./hooks/beforeChange");
var traverseFields = function (_a) {
    var config = _a.config, fields = _a.fields;
    return fields.map(function (field) {
        var _a;
        if (field.type === 'relationship' || field.type === 'upload') {
            return __assign(__assign({}, field), { hooks: __assign(__assign({}, (field.hooks || {})), { beforeChange: __spreadArray(__spreadArray([], (((_a = field.hooks) === null || _a === void 0 ? void 0 : _a.beforeChange) || []), true), [
                        (0, beforeChange_1.getBeforeChangeHook)({ config: config, field: field }),
                    ], false) }) });
        }
        if ('fields' in field) {
            return __assign(__assign({}, field), { fields: traverseFields({ config: config, fields: field.fields }) });
        }
        if (field.type === 'tabs') {
            return __assign(__assign({}, field), { tabs: field.tabs.map(function (tab) {
                    return __assign(__assign({}, tab), { fields: traverseFields({ config: config, fields: tab.fields }) });
                }) });
        }
        if (field.type === 'blocks') {
            return __assign(__assign({}, field), { blocks: field.blocks.map(function (block) {
                    return __assign(__assign({}, block), { fields: traverseFields({ config: config, fields: block.fields }) });
                }) });
        }
        return field;
    });
};
var relationshipsAsObjectID = function ( /** Possible args in the future */) {
    return function (config) {
        var webpack = (0, webpack_1.extendWebpackConfig)(config);
        return __assign(__assign({}, config), { admin: __assign(__assign({}, (config.admin || {})), { webpack: webpack }), collections: (config.collections || []).map(function (collection) {
                return __assign(__assign({}, collection), { fields: traverseFields({
                        config: config,
                        fields: collection.fields,
                    }) });
            }), globals: (config.globals || []).map(function (global) {
                return __assign(__assign({}, global), { fields: traverseFields({
                        config: config,
                        fields: global.fields,
                    }) });
            }) });
    };
};
exports.relationshipsAsObjectID = relationshipsAsObjectID;
//# sourceMappingURL=index.js.map