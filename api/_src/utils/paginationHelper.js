/**
 * Reusable Pagination Helper
 * @param {number} total - Total number of records
 * @param {number} page - Current page number
 * @param {number} limit - Records per page
 * @returns {Object} - Pagination details
 */
const getPagination = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = parseInt(page) || 1;
  const currentLimit = parseInt(limit) || 10;

  return {
    total,
    totalPages,
    currentPage,
    limit: currentLimit
  };
};

/**
 * Helper to get offset and limit for Sequelize queries
 * @param {number} page - Current page
 * @param {number} limit - Records per page
 * @returns {Object} - { limit, offset }
 */
const getPagingData = (page, limit) => {
  const currentLimit = parseInt(limit) || 10;
  const currentPage = parseInt(page) || 1;
  const offset = (currentPage - 1) * currentLimit;

  return { limit: currentLimit, offset };
};

module.exports = {
  getPagination,
  getPagingData
};
