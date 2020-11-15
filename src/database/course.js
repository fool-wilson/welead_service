const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '@Fenri1234',
  database : 'welead'
});

/**
 * get teachers from user table
 */
function getTeachers(courseId) {
  return new Promise( (resolve, reject) => {
    let result = new Array();
    connection.query(
      'SELECT * FROM user '+
      'left join course_teacher on course_teacher.user_id = user.user_id '+
      'WHERE course_teacher.course_id = ?',
      [courseId],
      (error, teachers) => {
        if(error) reject("Something wrong has happend with database！");
        else if(teachers.length) {
          for(teacher of teachers) {
            result.push({
              "teacher_id":          teacher['user_id'],
              "teacher_name":        teacher['user_name'],
              "teacher_avatar":      teacher['avatar'],
              "teacher_description": teacher['user_description'],
              "teacher_title":       teacher['user_title'],
              "teacher_experience":  teacher['user_experience'],
              "teacher_case":        teacher['user_case'],
              "teacher_image":       teacher['user_image'],
            })
          }
          resolve(result);
        }
        else reject("User verification failed!");
      }
    );
  });
}

/**
 * select courses by tags from course table
 */
async function list(params) {
  return new Promise( (resolve, reject) => {
    let result = new Array();
    connection.query(
      'SELECT * FROM course_tag '+
      'left join course on course.course_id = course_tag.course_id '+
      'WHERE course_tag.tag_id in (?)',
      params['tag_ids'],
      (error, courses) => {
        if(error) reject("Something wrong has happend with database！");
        else if(courses.length) {
          for(course of courses) {
            getTeachers(course['course_id'])
            .then( teachers => {
              result.push({
                "course_id":         course['course_id'],
                "course_name":       course['course_name'],
                "course_intro":      course['course_intro'],
                "course_capacity":   course['course_capacity'],
                "course_price":      course['course_price'],
                "course_status":     course['course_status'],
                "created_time":      course['created_time'],
                "course_start_time": course['course_start_time'],
                "course_hours":      course['course_hours'],
                "course_mode":       course['course_mode'],
                "teachers":          teachers
              });
            });
            resolve(result);
          }
        }
        else reject("Not found any course！");
      }
    )
  });
}

/**
 * select course by id from course table
 */
function get(courseId) {
  return new Promise( (resolve, reject) => {
    let result = new Object();
    connection.query(
      'SELECT * FROM course_tag '+
      'left join course on course.course_id = course_tag.course_id '+
      'WHERE course_tag.course_id = ?',
      [courseId],
      (error, course) => {
        if(error) reject("Something wrong has happend with database！");
        else if(course.length) {
          getTeachers(courseId)
          .then( teachers => {
            result = {
              "course_id":         course['course_id'],
              "course_name":       course['course_name'],
              "course_intro":      course['course_intro'],
              "course_capacity":   course['course_capacity'],
              "course_price":      course['course_price'],
              "course_status":     course['course_status'],
              "created_time":      course['created_time'],
              "course_start_time": course['course_start_time'],
              "course_hours":      course['course_hours'],
              "course_mode":       course['course_mode'],
              "teachers":          teachers
            };
          });
          resolve(result);
        }
        else reject("Not found any course！");
      }
    );
  });
}

module.exports = {
  list,
  get
}