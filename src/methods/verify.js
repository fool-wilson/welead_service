const user = require('../database/user');

/**
 * verify account if exist
 * @param {*} req request
 * @param {*} res response
 */
function verifyAccount(req, res) {
  user.verify(req.body)
  .then( response => {
    res.send({
      "status": "1",
      "message": response
    })
  })
  .catch( error => {
    res.send({
      "status": "2",
      "message": error
    })
  })
}

module.exports = verifyAccount;