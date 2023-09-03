const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
var cors = require('cors')

// fetch all sub-categories
router.options('/subcate', cors())
router.get('/subcate',cors(), function(req, res, next) {

    const sql = "SELECT * FROM subcate";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows, msg : "Sub-Catagories retrived successfully!"}])
    })
  });

   //fetch active sub-categories
   router.options('/subcate/active', cors())
   router.get('/subcate/active',cors(), function(req, res, next) {
    const status = 1;
    const sql = `SELECT * FROM subcate WHERE subcate_status = ${status}`;
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      if(rows.length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.json([{status : true, data : rows, msg : "Catagories retrived successfully!"}])
      }else{
        res.setHeader('Content-Type', 'application/json');
      res.json([{status : false, data : rows, msg : "No Sub category to show!"}])
      }
      
    })
  });

  

  //fetch sub category by category id
  router.options('/subcate/:cate/:status', cors())
  router.get('/subcate/:cate/:status',cors(), function(req, res, next) {
    const cate = req.params.cate;
    const status = req.params.status;
  
    const sql = "SELECT * FROM subcate WHERE subcate_cate = ? AND subcate_status = ?";
    db.query(sql,[cate,status], function(err, rows, fields) {
      if(err) {
        console.log(err);
        res.status(500).send({ error: 'Something failed!' })
      } if(rows.length > 0){
        res.json([{status : true, data : rows, msg : "Sub retrived successfully through id!"}])
      }else{
        res.json([{status : false, msg : "No Sub found"}])
      }
        
    })
  });

  //fetch subcate irespective of status

  router.options('/subcateall/:cate', cors())
   router.get('/subcateall/:cate',cors(),function(req, res, next) {
    const cate = req.params.cate;
    const sql = `SELECT * FROM subcate WHERE subcate_cate = ${cate}`;
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      if(rows.length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.json([{status : true, data : rows, msg : "Catagories retrived successfully!"}])
      }else{
        res.setHeader('Content-Type', 'application/json');
      res.json([{status : false, data : rows, msg : "No Sub category to show!"}])
      }
      
    })
  });

  // add subcategory

  router.options('/subcate/create', cors())
router.post('/subcate/create',cors(),function(req, res, next) {
  const subcatename = req.body.subcatename;
  const subcatedescription = req.body.subcatedescription;
  const subcateurl = req.body.subcateurl;
  const subcatecate = req.body.subcatecate;
  const subcatestatus = 1;


  
  const sql = `INSERT INTO subcate(subcate_name,subcate_desctiption,subcate_url,subcate_cate,subcate_status) VALUES ('${subcatename}','${subcatedescription}','${subcateurl}','${subcatecate}','${subcatestatus}')`;
  
  db.query(sql, function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.status(200).send({'status': 'success', 'id': result.insertId})
  })
});  

  //delete
  //delete


router.delete('/subcatedelete/:subcateid', function(req, res, next) {
  const subcateid = req.params.subcateid;
  const sql = `DELETE FROM subcate WHERE subcate_id = ${subcateid}`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ 'error': 'Something failed!' })
    }
    else{
      res.status(200).send({'status': 'success', 'message': 'Deleted Succesfully!'})
    }
    
  })
});




  module.exports = router;