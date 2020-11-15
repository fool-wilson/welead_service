const user = require('../database/user');

/**
 * get user profile
 * @param {*} req request
 * @param {*} res response
 */
function getProfile(req, res) {
  user.get(req.body)
  .then( response => res.send({
    "status": "1",
    "data": response
  }))
  .catch( error => res.send({
    "status": "2",
    "message": error
  }))
}

/**
 * get teacher list
 * @param {*} req request
 * @param {*} res response
 */
function listTeachers(req, res) {
  user.listTeachers()
  .then( response => {
    res.send({
      "status": "1",
      "data": response
    })
  })
  .catch( error => {
    res.send({
      "status": "2",
      "message": error
    })
  })
}

module.exports = {
  getProfile,
  listTeachers
}