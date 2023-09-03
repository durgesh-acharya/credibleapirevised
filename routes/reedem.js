const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
var cors = require('cors')

//show all reedem requests
router.get('/reedem', function(req, res, next) {

    const sql = "SELECT * FROM reedem ORDER BY rr_id DESC";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows, msg : "Reedem Request retrived successfully!"}])
    })
  });

//reedem madeby
router.options('/reedem/frommadeby/:madeby', cors())
router.get('/reedem/frommadeby/:madeby',cors(), function(req, res, next) {
    const madeby = req.params.madeby;
    const sql = `SELECT * FROM reedem WHERE rr_madeby = ${madeby} ORDER BY rr_id DESC`;
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' });
      }
      if(rows.length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json([{status : true, data : rows, msg : "Reedem Request retrived successfully!"}])
      }else{
        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
      res.json([{status : false, data : rows, msg : "Reedem Request retrived successfully!"}])
      }
      
    })
  });

// reedem create

router.options('/reedem/create', cors())
router.post('/reedem/create',cors(), function(req, res, next) {
 
    const rrqrid = req.body.rrqrid;
    const rrqrunique = req.body.rrqrunique;
    const rrqrrupees = req.body.rrqrrupees;
    const rrmadeby = req.body.rrmadeby;
    const rrupiid = req.body.rrupiid;
    const rrtranid = req.body.rrtranid;
    const rrstatus = 0;
    
  
    const sql = `INSERT INTO reedem(rr_qrid, rr_qrunique, qr_rupees, rr_madeby, rr_upiid, rr_tranid,rr_status) VALUES ('${rrqrid}','${rrqrunique}','${rrqrrupees}','${rrmadeby}','${rrupiid}','${rrtranid}','${rrstatus}')`;
    
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

//fetch redeem from status
router.options('/reedem/fromstatus/:status', cors())
router.get('/reedem/fromstatus/:status',cors(), function(req, res, next) {
    const status = req.params.status;
    const sql = `SELECT * FROM reedem WHERE rr_status = ${status} ORDER BY rr_id DESC`;
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' });
      }
      if(rows.length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json([{status : true, data : rows, msg : "Reedem Request retrived successfully!"}])
      }else{
        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
      res.json([{status : false, data : rows, msg : "Reedem Request retrived successfully!"}])
      }
      
    })
  });

//update redeem
router.options('/reedem/updatestatus/:rrid', cors())
router.put('/reedem/updatestatus/:rrid',cors(), function(req, res, next) {
 
    
    const rrtran = req.body.rrtran;
    const rrstatus = req.body.rrstatus;
    const rrid = req.params.rrid;
    const sql = `UPDATE reedem SET rr_tranid = '${rrtran}',rr_status = '${rrstatus}' WHERE rr_id = '${rrid}'`;
    
    db.query(sql, function(err, result) {
      if(err) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.status(200).send({'status': 'success', 'msg': 'updated successfully'})
    })
  });  

  //redeem nums
  router.options('/redeemnums', cors())
router.get('/redeemnums',cors(), function(req, res, next) {

  const sql = "SELECT * FROM reedem";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
  else{
    res.setHeader('Content-Type', 'application/json');
    res.json([{status : true, msg : rows.length}])
  }
  })
});

//redeem rupees total
router.options('/redeemtotal', cors())
router.get('/redeemtotal',cors(), function(req, res, next) {

  const sql = "SELECT SUM(qr_rupees) as total FROM reedem";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    else{
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows}])
    }
  })
});

//redeem rupees total pending
router.options('/redeempendingtotal', cors())
router.get('/redeempendingtotal',cors(), function(req, res, next) {

  const sql = "SELECT SUM(qr_rupees) as total FROM reedem WHERE rr_status = 0";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    else{
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows}])
    }
  })
});

//redeemd rupees total settled
router.options('/redeemsettledtotal', cors())
router.get('/redeemsettledtotal',cors(), function(req, res, next) {

  const sql = "SELECT SUM(qr_rupees) as total FROM reedem WHERE rr_status = 1";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }else{
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows}])
    }
   
  })
});


module.exports=router;