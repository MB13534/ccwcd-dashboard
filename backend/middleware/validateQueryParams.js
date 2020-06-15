function validateQueryParams(requiredParams = []) {
  return (req, res, next) => {
    requiredParams.map((param) => {
      if (!req.query[param]) {
        let error = new Error(
          `Query Error: Please provide a valid value for the ${param} query parameter`
        );
        next(error);
      }
    });
    next();
  };
}

module.exports.validateQueryParams = validateQueryParams;
