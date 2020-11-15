const course = require('./courses')
const loginUser = require('./login');
const profile = require('./profile')
const registerUser = require('./register');
const verifyAccount = require('./verify');
const createPurchase = require('./purchases');

module.exports = {
  createPurchase,
  loginUser,
  getProfile: profile.getProfile,
  listTeachers: profile.listTeachers,
  registerUser,
  verifyAccount,
  getCourse: course.getCourse,
  listCourse: course.listCourse
}