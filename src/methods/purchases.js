const purchase = require('../database/purchase');

/**
 * 
 */
function createPurchase(req, res) {
  purchase.create(req.query)
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

module.exports = createPurchase;