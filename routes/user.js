const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
var cors = require('cors')

// fetch all users
router.options('/user', cors())
router.get('/user',cors(), function(req, res, next) {

    const sql = "SELECT * FROM user ORDER BY user_id DESC";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows, msg : "Users retrived successfully!"}])
    })
  });

  //user existence check
  router.options('/user/exist/:mobile/:status', cors())
router.get('/user/exist/:mobile/:status',cors(), function(req, res, next) {
    const mobile = req.params.mobile;
    const activestts = req.params.status;
  
    const sql = "SELECT * FROM user WHERE user_mobile = ? AND user_active = ?";
    db.query(sql,[mobile,activestts], function(err, row, fields) {
      if(err) {
        console.log(err);
        res.status(500).send({ error: 'Something failed!' })
      } if(row.length > 0){
        res.json([{status : true, data : row[0], msg : "User retrived successfully through id!"}])
      }else{
        res.json([{status : false, msg : "No User found"}])
      }
        
    })
  });
  
  //user by mobile number

   //user existence check
router.options('/user/bymobile/:mobile/:status', cors()) 
router.get('/user/bymobile/:mobile/:status',cors(), function(req, res, next) {
  const mobile = req.params.mobile;
  const activestts = req.params.status;

  const sql = "SELECT * FROM user WHERE user_mobile = ? AND user_active = ?";
  db.query(sql,[mobile,activestts], function(err, rows, fields) {
    if(err) {
      console.log(err);
      res.status(500).send({ error: 'Something failed!' })
    } if(rows.length > 0){
      res.json([{status : true, data : rows, msg : "User retrived successfully through id!"}])
    }else{
      res.json([{status : false, msg : "No User found"}])
    }
      
  })
});



//add user

router.options('/user/create', cors())
router.post('/user/create',cors(), function(req, res, next) {
 
    const usermobile = req.body.usermobile;
    const username = req.body.username;
    const usercity = req.body.usercity;
    const userduid = req.body.userduid;
    const userstatus = req.body.userstatus;
    const usershop = req.body.usershop;
    
  
    const sql = `INSERT INTO user(user_mobile, user_name, user_city, user_duid,user_active,user_shop) VALUES ('${usermobile}','${username}','${usercity}','${userduid}','${userstatus}','${usershop}')`;
    
    db.query(sql, function(err, result) {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.status(200).send({'status': 'success', 'id': result.insertId})
    })
  });  

module.exports=router;