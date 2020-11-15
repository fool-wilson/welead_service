const user = require('../database/user');

/**
 * login the user
 * @param {*} req request
 * @param {*} res response
 */
function loginUser(req, res) {
  user.login(req.body)
  .then( response => res.send({
    "status": "1",
    "data": response
  }))
  .catch( error => res.send({
    "status": "2",
    "message": error
  }));
}

module.exports = loginUser;