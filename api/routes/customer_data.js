const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mawmeow_data"
});

router.post('/all', (req, res, next) => {
    con.connect(function(err) {
        if (err) console.log(err);
        con.query("SELECT * FROM customer", function (err, result, fields) {
        if (err)  console.log(err);
            res.status(200).json(result);
        });
    });
   
});
router.post('/firstname/:name', (req, res, next) => {
    var fname = req.params.name;
    con.connect(function(err) {
        if (err) console.log(err);
        con.query("SELECT * FROM customer WHERE FirstName='"+fname+"'", function (err, result, fields) {
            if (err) console.log(err);
            res.status(200).json(result);
        });
    });
});

router.delete('/id/:id', (req, res) => {
    var id = req.params.id;
    var sql = "DELETE FROM customer WHERE PersonID="+id;
    con.connect(function(err) {
        if (err) console.log(err);
        con.query(sql, function (err, result) {
          if (err) console.log(err);
          console.log("Number of records deleted: " + result.affectedRows);
        });
      });
    res.status(204).send()

 })

router.post('/add', (req, res) => {
    
    var val = [req.body['LastName'],req.body['FirstName'],req.body['Address'],req.body['Phone'],req.body['Email']];
    var sql = "INSERT INTO customer (LastName, FirstName, Address, Phone, Email) VALUES (\""+val[0]+"\",\""+val[1]+"\",\""+val[2]+"\",\""+val[3]+"\",\""+val[4]+"\")";

    con.connect(function(err) {
        if (err) console.log(err);
        con.query(sql, function (err, result) {
            if (err) console.log(err);
            res.status(201).json("1 record inserted");
        });
    });
  })

module.exports = router;