const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
var cors = require('cors')


//admin auth


router.options('/admin/auth/:mobile/:password', cors())
router.get('/admin/auth/:mobile/:password',cors(), function(req, res, next) {
    const mobile = req.params.mobile;
    const password = req.params.password;
  
    const sql = "SELECT * FROM admin WHERE admin_login_id = ? AND admin_password = ?";
    db.query(sql,[mobile,password], function(err, rows, fields) {
      if(err) {
        console.log(err);
        res.status(500).send({ error: 'Something failed!' })
      } if(rows.length > 0){
        res.json([{status : true, data : rows, msg : "Admin retrived successfully through id!"}])
      }else{
        res.json([{status : false, msg : "No Admin found"}])
      }
        
    })
  });






module.exports=router;