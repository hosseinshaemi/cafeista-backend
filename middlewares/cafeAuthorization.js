const jwt = require('jsonwebtoken');
const { Cafe } = require('../models');

const cafeAuthorization = async (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ status: 'unauthorized' });

    const cafe = await Cafe.findOne({ where: { email: decoded.email } });
    if (!cafe) return res.status(401).json({ status: 'unauthorized' });

    req.cafe = decoded;
    next();
  });
};

module.exports = cafeAuthorization;
