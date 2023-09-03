const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
var cors = require('cors')

//fetch productimageurl by productid



router.get('/prodimg/:prodid', function(req, res, next) {
    const prodid = req.params.prodid;
    const sql = `SELECT * FROM prodimg WHERE prodimg_prod = ${prodid}`;
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      if(rows.length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.json([{status : true, data : rows, msg : "Products Image Url retrived successfully!"}])
      }else{
        res.setHeader('Content-Type', 'application/json');
      res.json([{status : false, data : rows, msg : "Products Image Url not found!"}])
      }
      
    })
  });


//add product image
router.options('/prodimg/create', cors())
router.post('/prodimg/create',cors(),function(req, res, next) {
  const prodimgprod = req.body.prodimgprod;
  const prodimgurl = req.body.prodimgurl;
  
  const sql = `INSERT INTO prodimg(prodimg_prod,prodimg_url) VALUES ('${prodimgprod}','${prodimgurl}')`;
  
  db.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }else{
      res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).send({'status': 'success', 'id': result.insertId})
    }
    
  })
});  

//delete


router.delete('/prodimgdelete/:prodid', function(req, res, next) {
  const prodid = req.params.prodid;
  const sql = `DELETE FROM prodimg WHERE prodimg_id = ${prodid}`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ 'error': 'Something failed!' })
    }
    else{
      res.status(200).send({'status': 'success', 'message': 'Deleted Succesfully!'})
    }
    
  })
});


module.exports=router;