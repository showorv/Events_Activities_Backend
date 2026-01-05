"use strict";
// export interface IPaginationOptions {
//     page?: number;
//     limit?: number;
//     sortBy?: string;
//     sortOrder?: "asc" | "desc";
//   }
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQuery = void 0;
const buildQuery = (Model, options, pagination) => {
    const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", } = pagination || {};
    const skip = (page - 1) * limit;
    const searchableFields = options.searchableFields || ["name", "type", "location", "description"];
    let searchCondition = {};
    if (options?.searchTerm) {
        searchCondition = {
            $or: searchableFields.map((field) => {
                if (field.includes(".")) {
                    return { [field]: { $regex: options.searchTerm, $options: "i" } };
                }
                return { [field]: { $regex: options.searchTerm, $options: "i" } };
            }),
        };
    }
    const filterCondition = options?.filters || {};
    return Model.find({
        ...searchCondition,
        ...filterCondition,
    })
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit);
};
exports.buildQuery = buildQuery;
//# sourceMappingURL=queryBuilder.js.map