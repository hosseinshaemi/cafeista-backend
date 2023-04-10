const jwt = require('jsonwebtoken');
const { User } = require('../models');

const userAuthorization = async (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ status: 'unauthorized' });

    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) return res.status(401).json({ status: 'unauthorized' });

    req.user = decoded;
    next();
  });
};

module.exports = userAuthorization;
