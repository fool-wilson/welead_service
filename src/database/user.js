const crypto = require('crypto');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'leadpack',
  password : 'Le@dpack1113',
  database : 'welead'
});

/**
 * 
 */
function listTeachers() {
  return new Promise( (resolve, reject) => {
    let result = new Object();
    connection.query(
      'SELECT * FROM user '+
      'WHERE is_teacher = 1',
      (error, teachers) => {
        if(error) reject("Something wrong has happend with database！");
        else if(teachers.length) {
          for(teacher of teachers) {
            result = {
              "teacher_id":          teacher['user_id'],
              "teacher_name":        teacher['user_name'],
              "teacher_avatar":      teacher['avatar'],
              "teacher_description": teacher['description'],
              "teacher_title":       teacher['title'],
              "teacher_experience":  teacher['experience'],
              "teacher_case":        teacher['case'],
              "teacher_image":       teacher['user_image'],
            }
          }
          resolve(result);
        }
        else reject("User verification failed!");
      }
    );
  });
}

/**
 * register a new user into user table
 */
function register(params) {
  return new Promise( (resolve, reject) => {
    params["id_token"] = crypto.randomBytes(32).toString('base64');
    params["login_token"] = crypto.randomBytes(32).toString('base64');
    params["verify_token"] = crypto.randomBytes(32).toString('base64');
    params['create_time'] = new Date();
    connection.query(
      'INSERT INTO user SET ?',
      params,
      (error) => {
        if(error) throw error; //reject("Something wrong has happend with database！");
        else {
          resolve(params["verify_token"]);
        }
      }
    );
  });
}

/**
 * get user from user table
 */
function get(params) {
  return new Promise( (resolve, reject) => {
    let result;
    connection.query(
      'SELECT * FROM welead.user WHERE id_token = ? AND login_token = ?;',
      [params['id_token'], params['login_token']],
      (error, row) => {
        if(error) reject("Something wrong has happend with database！");
        else if(row.length) {
          result = {
            "is_teacher":     row[0]['is_teacher'],
            "user_name":      row[0]['user_name'],
            "is_verified":    row[0]['is_verified'],
            "avatar":         row[0]['avatar'],
            "gender":         row[0]['gender'],
            "birthday":       row[0]['birthday'],
            "is_system_user": row[0]['is_system_user'],
            "description":    row[0]['description'],
            "experience":     row[0]['experience'],
            "case":           row[0]['case'],
          }
          resolve(result);
        } else {
          reject("User verification failed!")
        }
      });
  });
}

/**
 * verify user account
 */
function verify(params) {
  return new Promise( (resolve, reject) => {
    connection.query(
      'SELECT user_id FROM user WHERE verify_token = ? AND id_token = ? AND login_token = ?;',
      [params['verify_token'], params['id_token'], params['login_token']],
      (error, result) => {
        if(error) reject("Something wrong has happend with database！");
        else if(result.length) {
          connection.query(
            'UPDATE user SET is_verified = 1 WHERE id_token = ?;',
            [params['id_token']],
            (error) => {
              if(error) reject("Something wrong has happend with database！");
            }
          )
          resolve("User verification is successful!");
        }
        else reject("User verification failed!");
      }
    );
  });
}

/**
 * verify user account and password to login
 */
function login(params) {
  return new Promise((resolve, reject) => {
    let result = new Object();
    connection.query(
      'SELECT id_token, login_token, is_teacher, user_name, is_verified, avatar FROM welead.user WHERE account = ? AND password = ?;',
      [params.account, params.password],
      (error, row) => {
        if(error) reject("Something wrong has happend with database！");
        else if(row.length) {
          result = {
            "id_token":    row[0]['id_token'],
            "login_token": row[0]['login_token'],
            "is_teacher":  row[0]['is_teacher'],
            "user_name":   row[0]['user_name'],
            "is_verified": row[0]['is_verified'],
            "avatar":      row[0]['avatar'],
          }
          resolve(result);
        }
        else reject("User verification failed!");
      }
    )
  });
}

module.exports = {
  listTeachers,
  register,
  get,
  verify,
  login
}