// export interface IPaginationOptions {
//     page?: number;
//     limit?: number;
//     sortBy?: string;
//     sortOrder?: "asc" | "desc";
//   }
  
//   export interface IQueryOptions {
//     searchTerm?: string;
//     filters?: Record<string, unknown>;
//   }
  
//   export const buildQuery = (
//     Model: any,
//     options: { searchTerm?: string; filters?: any },
//     pagination: any
//   ) => {
//     const {
//       page = 1,
//       limit = 10,
//       sortBy = "createdAt",
//       sortOrder = "desc",
//     } = pagination || {};
  
//     const skip = (page - 1) * limit;
  
//     // SEARCH
//     const searchableFields = ["name", "type", "location", "description"];
  
//     let searchCondition = {};
//     if (options?.searchTerm) {
//       searchCondition = {
//         $or: searchableFields.map((field) => ({
//           [field]: { $regex: options.searchTerm, $options: "i" },
//         })),
//       };
//     }
  
//     // FILTER
//     const filterCondition = options?.filters || {};
  
//     // ALWAYS RETURN QUERY OBJECT
//     return Model.find({
//       ...searchCondition,
//       ...filterCondition,
//     })
//       .sort({ [sortBy]: sortOrder })
//       .skip(skip)
//       .limit(limit);
//   };
  
export interface IPaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }
  
  export interface IQueryOptions {
    searchTerm?: string;
    filters?: Record<string, unknown>;
    searchableFields?: string[]; 
  }
  
  export const buildQuery = (
    Model: any,
    options: IQueryOptions,
    pagination: IPaginationOptions
  ) => {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = pagination || {};
  
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
  