const jwt = require("jsonwebtoken");
const userService = require("../users/user.service");
const { secret } = require('config.json');

module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }
    // authorize based on user role
    return [
      (req, res, next) => {
        if (req.headers.authorization) {
          const response = jwt.verify(
            req.headers.authorization.split(" ")[1],
            secret,
            (err, result) => {
              if (err) {
                throw err;
              }
              return result;
            }
          );
          req.user = response;
          const user = userService.getById(response.sub);
          if (!user && roles.length && !roles.includes(req.user.role)) {
            return res.status(401).json({ message: "Unauthorized" });
          } else {
            next();
          }
        }
      },
    ];
 }