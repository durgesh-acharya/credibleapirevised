const express = require('express');
const router = express.Router();

const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
var cors = require('cors')

//show all qr
router.get('/qr', function(req, res, next) {

    const sql = "SELECT * FROM qr ORDER BY qr_id DESC";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.setHeader('Content-Type', 'application/json');
      res.json([{status : true, data : rows, msg : "Catagories retrived successfully!"}])
    })
  });

  //qr status wise

  router.get('/qr/fromstatus/:status', function(req, res, next) {
    const status = req.params.status;
    const sql = `SELECT * FROM qr WHERE qr_use = ${status} ORDER BY qr_id DESC`;
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' });
      }
      if(rows.length > 0){
        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json([{status : true, data : rows, msg : "Catagories retrived successfully!"}])
      }else{
        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
      res.json([{status : false, data : rows, msg : "Catagories retrived successfully!"}])
      }
      
    })
  });

//create qr
router.options('/qr/create', cors())
router.post('/qr/create',cors(), function(req, res, next) {
 
    const qrunique = req.body.qrunique;
    const qruse = req.body.qruse;
    const qrreedemed = req.body.qrreedemed;
    const qrrupees = req.body.qrrupees;
    const qrreedemedby = req.body.qrreedemedby;
    const qrreedemstatus = req.body.qrreedemstatus;
  
    const sql = `INSERT INTO qr(qr_unique, qr_use, qr_reedemed, qr_rupees,qr_reedemedby,qr_reedemstatus) VALUES ('${qrunique}','${qruse}','${qrreedemed}','${qrrupees}','${qrreedemedby}','${qrreedemstatus}')`;
    
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
  
//pair qr
router.options('/qr/pair/:qrid', cors())
router.put('/qr/pair/:qrid',cors(), function(req, res, next) {
 
    const qrunique = req.body.qrunique;
    const qrid = req.params.qrid;
    const sql = `UPDATE qr SET qr_unique = '${qrunique}' WHERE qr_id = '${qrid}'`;
    
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

//block qr
router.options('/qr/block/:qrid', cors())
router.put('/qr/block/:qrid',cors(), function(req, res, next) {
 
    const qruse = req.body.qruse;
    const qrid = req.params.qrid;
    const sql = `UPDATE qr SET qr_use = '${qruse}' WHERE qr_id = '${qrid}'`;
    
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

  //unblock qr
  //block qr
router.options('/qr/unblock/:qrid', cors())
router.put('/qr/unblock/:qrid',cors(), function(req, res, next) {
 
    const qruse = req.body.qruse;
    const qrid = req.params.qrid;
    const sql = `UPDATE qr SET qr_use = '${qruse}' WHERE qr_id = '${qrid}'`;
    
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



//update qr on receiving reedem request
router.options('/qr/onrr/:qrid', cors())
router.put('/qr/onrr/:qrid',cors(), function(req, res, next) {
 
    const qruse = req.body.qruse;
    const qrreedem = req.body.qrreedem;
    const qrreedemby = req.body.qrreedemby;
    const qrreedemstatus = req.body.qrreedemstatus;

    const qrid = req.params.qrid;
    const sql = `UPDATE qr SET qr_use = '${qruse}',qr_reedemed = '${qrreedem}',qr_reedemedby = '${qrreedemby}',qr_reedemstatus = '${qrreedemstatus}' WHERE qr_id = '${qrid}'`;
    
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

//CHECK WHETHER QR IS USED OR UNUSED

router.get('/qr/usestatus/:qrunique', function(req, res, next) {
  const qrunique = req.params.qrunique;
  const qrstatus = 0;
  const sql = `SELECT * FROM qr WHERE qr_unique = ${qrunique} AND qr_use =${qrstatus}`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' });
    }
    if(rows.length > 0){
      res.setHeader('Content-Type', 'application/json');
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.json([{status : true, data : rows, msg : "Qr retrived successfully!"}])
    }else{
      res.setHeader('Content-Type', 'application/json');
      res.setHeader("Access-Control-Allow-Origin", "*");
    res.json([{status : false, data : rows, msg : "Qr retrived successfully!"}])
    }
    
  })
});

//update qruse
router.options('/qr/updatestatus/:qrunique', cors())
router.put('/qr/updatestatus/:qrunique',cors(), function(req, res, next) {
 
    const qruse = req.body.qruse;
    const qrreedem = req.body.qrreedem;
    const qrreedemby = req.body.qrreedemby;
    const qrreedemstatus = req.body.qrreedemstatus;

    const qrunique = req.params.qrunique;
    const sql = `UPDATE qr SET qr_use = '${qruse}',qr_reedemed = '${qrreedem}',qr_reedemedby = '${qrreedemby}',qr_reedemstatus = '${qrreedemstatus}' WHERE qr_unique = '${qrunique}'`;
    
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

//qr numbs

router.options('/qrnums', cors())
router.get('/qrnums', cors(),function(req, res, next) {

  const sql = "SELECT * FROM qr ORDER BY qr_id DESC";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.setHeader('Content-Type', 'application/json');
    res.json([{status : true, msg : rows.length}])
  })
});


//qr nums by redeem

router.options('/qrredeemnums', cors())
router.get('/qrredeemnums',cors(), function(req, res, next) {

  const sql = "SELECT * FROM qr WHERE qr_reedemstatus = 1";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.setHeader('Content-Type', 'application/json');
    res.json([{status : true, msg : rows.length}])
  })
});

//total rupees of qr generate

router.options('/qrrupees', cors())
router.get('/qrrupees',cors(), function(req, res, next) {

  const sql = "SELECT SUM(qr_rupees) as total FROM qr";
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.setHeader('Content-Type', 'application/json');
    res.json([{status : true,data : rows, msg : rows.length}])
  })
});


module.exports=router;