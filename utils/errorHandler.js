const errorHandler = (res, error) => {
  const errArray = [];
  error.errors.forEach((e) => errArray.push(e.message));
  return res.status(422).json({
    successfull: false,
    message: errArray,
  });
};

module.exports = errorHandler;