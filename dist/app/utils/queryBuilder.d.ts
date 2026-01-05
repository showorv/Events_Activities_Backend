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
export declare const buildQuery: (Model: any, options: IQueryOptions, pagination: IPaginationOptions) => any;
//# sourceMappingURL=queryBuilder.d.ts.map