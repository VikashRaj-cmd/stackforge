// Async error catching utility\n
/**
 * FILE: utils/catchAsync.js
 * PURPOSE:
 * Wrap async controllers so rejected promises automatically go to next(err).
 * This removes repetitive try/catch blocks from every controller.
 */

const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default catchAsync;