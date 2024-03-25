"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBeforeChangeHook = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var types_1 = require("payload/dist/fields/config/types");
var convertValue = function (_a) {
    var value = _a.value, relatedCollection = _a.relatedCollection;
    var customIDField = relatedCollection.fields.find(function (field) { return (0, types_1.fieldAffectsData)(field) && field.name === 'id'; });
    if (!customIDField)
        return new mongoose_1.default.Types.ObjectId(value);
    return value;
};
function isValidRelationObject(value) {
    return typeof value === 'object' && value !== null && 'relationTo' in value && 'value' in value;
}
var getBeforeChangeHook = function (_a) {
    var config = _a.config, field = _a.field;
    return function (_a) {
        var _b, _c;
        var value = _a.value;
        var relatedCollection;
        var hasManyRelations = typeof field.relationTo !== 'string';
        if (!hasManyRelations) {
            relatedCollection = (_b = config.collections) === null || _b === void 0 ? void 0 : _b.find(function (_a) {
                var slug = _a.slug;
                return slug === field.relationTo;
            });
        }
        if (Array.isArray(value)) {
            return value.map(function (val) {
                var _a;
                // Handle has many
                if (relatedCollection && val && (typeof val === 'string' || typeof val === 'number')) {
                    return convertValue({
                        relatedCollection: relatedCollection,
                        value: val,
                    });
                }
                // Handle has many - polymorphic
                if (isValidRelationObject(val)) {
                    var relatedCollectionForSingleValue = (_a = config.collections) === null || _a === void 0 ? void 0 : _a.find(function (_a) {
                        var slug = _a.slug;
                        return slug === val.relationTo;
                    });
                    if (relatedCollectionForSingleValue) {
                        return {
                            relationTo: val.relationTo,
                            value: convertValue({
                                relatedCollection: relatedCollectionForSingleValue,
                                value: val.value,
                            }),
                        };
                    }
                }
                return val;
            });
        }
        // Handle has one - polymorphic
        if (isValidRelationObject(value)) {
            relatedCollection = (_c = config.collections) === null || _c === void 0 ? void 0 : _c.find(function (_a) {
                var slug = _a.slug;
                return slug === value.relationTo;
            });
            if (relatedCollection) {
                return {
                    relationTo: value.relationTo,
                    value: convertValue({ relatedCollection: relatedCollection, value: value.value }),
                };
            }
        }
        // Handle has one
        if (relatedCollection && value && (typeof value === 'string' || typeof value === 'number')) {
            return convertValue({
                relatedCollection: relatedCollection,
                value: value,
            });
        }
        return value;
    };
};
exports.getBeforeChangeHook = getBeforeChangeHook;
//# sourceMappingURL=beforeChange.js.map