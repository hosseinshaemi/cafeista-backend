const adminAuthorization = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: 'unauthorized',
    });
  }
};

module.exports = adminAuthorization;
