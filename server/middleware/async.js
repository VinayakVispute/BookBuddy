const asyncWrapper = (functionController) => {
  return async (req, res, next) => {
    try {
      await functionController(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
