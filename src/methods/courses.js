const course = require('../database/course');

/**
 * list course table
 * @param {*} req request
 * @param {*} res response
 */
function listCourse(req, res) {
  course.list(req.query)
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
    });
  })
}

/**
 * get course information
 * @param {*} req request
 * @param {*} res response
 */
function getCourse(req, res) {
  course.get(req.params.id)
  .then( response => {
    res.send({
      "status": "1",
      "data": response
    });
  })
  .catch( error => {
    res.send({
      "status": "2",
      "message": error
    });
  })
}

module.exports = {
  getCourse,
  listCourse
}