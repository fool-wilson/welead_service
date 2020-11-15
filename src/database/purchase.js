const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '@Fenri1234',
  database : 'welead'
});

function getUserID(params) {
  return new Promise( (resolve, reject) => {
    let result = new String();
    connection.query(
      'SELECT user_id FROM welead.user WHERE id_token = ? AND login_token = ?;',
      [params['id_token'], params['login_token']],
      (error, row) => {
        if(error) reject("Something wrong has happend with database！");
        else if(row.length) {
          result = row[0]['user_id'];
          resolve(result);
        } else {
          reject("User verification failed!")
        }
      });
  });
}

/**
 * create purchase informat
 */
function create(params) {
  let purchaseParams = {
    "amount": params['amount'],
    "course_id": params['course_id'],
    "create_time": new Date()
  }
  return new Promise( (resolve, reject) => {
    getUserID(params)
    .then( response => {
      purchaseParams['user_id'] = response['user_id'];
      connection.query(
        'INSERT INTO user SET ?',
        purchaseParams,
        (error) => {
          if(error) reject("Something wrong has happend with database！");
          else {
            resolve("Success!");
          }
        }
      );
    });
  });
}

module.exports = {
  create
};
// function getPurchase() {
//   return new Promise( (resolve, reject) => {
//     let result = new String();
//     connection.query(
//       'SELECT user_id FROM welead.user WHERE id_token = ? AND login_token = ?;',
//       [params['id_token'], params['login_token']],
//       (error, row) => {
//         if(error) reject("Something wrong has happend with database！");
//         else if(row.length) {
//           result = row[0]['user_id'];
//           resolve(result);
//         } else {
//           reject("User verification failed!")
//         }
//       });
//   });
// }