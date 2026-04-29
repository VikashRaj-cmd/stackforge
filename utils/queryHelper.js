// Query building and filtering utilities\n
/**
 * queryHelper.js
 *
 * WHY:
 * Reusable pagination helpers prevent repeating the same logic
 * in multiple controllers.
 */

/**
 * Apply pagination to a mongoose query
 */
export const applyPagination = (query, queryParams, defaultLimit = 20) => {
  const page = Math.max(parseInt(queryParams.page, 10) || 1, 1);
  const limit = Math.min(parseInt(queryParams.limit, 10) || defaultLimit, 100);
  const skip = (page - 1) * limit;

  return {
    query: query.skip(skip).limit(limit),
    page,
    limit,
  };
};

/**
 * Build pagination metadata
 */
export const buildPaginationMeta = (totalCount, page, limit) => {
  const totalPages = Math.ceil(totalCount / limit);

  return {
    total: totalCount,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};