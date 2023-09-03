const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
var cors = require('cors')

// fetch all categories
router.options('/cate', cors())
router.get('/cate',cors(), function(req, res, next) {

    const sql = "SELECT * FROM cate";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json([{status : true, data : rows, msg : "Catagories retrived successfully!"}])
    })
  });

  //fetch active categories
  router.options('/cate/active', cors())
  router.get('/cate/active',cors(), function(req, res, next) {
    const status = 1;
    const sql = `SELECT * FROM cate WHERE cate_active = ${status}`;
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      if(rows.length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.json([{status : true, data : rows, msg : "Catagories retrived successfully!"}])
      }else{
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers',
         'Origin, X-Requested-With, Content-Type, Accept'
        );
      res.json([{status : false, data : rows, msg : "Catagories retrived successfully!"}])
      }
      
    })
  });
  
// add category

router.options('/cate/create', cors())
router.post('/cate/create', cors(), function(req, res, next) {
  const catename = req.body.catename;
  const catedescription = req.body.catedescription;
  const cateurl = req.body.cateurl;
  const cateactive = req.body.cateactive;


  
  const sql = `INSERT INTO cate(cate_name, cate_description, cate_url, cate_active) VALUES ('${catename}','${catedescription}','${cateurl}','${cateactive}')`;
  
  db.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({'status': 'success', 'id': result.insertId})
  })
});  



module.exports=router;