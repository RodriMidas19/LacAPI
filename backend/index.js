const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyparser.json());
app.listen(3000,()=>{
    console.log('listening on port 3000');
});

const db = mysql.createConnection({
    host: 'http://51.103.46.56/phpmyadmin',
    user: 'root',
    password: 'ofixe19.2005R',
    database: 'db_lac',
    port: 3306
});
db.connect(err=>{
    if(err){console.log(err,'dberror');}
    else{console.log('database connected...');}
});

//Get data from Direcao
app.get('/lac/direcao', (req, res)=>{
    let qry = `SELECT * FROM direcao order by id`;

    db.query(qry, (err,result) => {
        if(err){
            console.log(err,'errs');
        }
        if(result.length >0){
            res.send({
                message:'direcao data get',
                data: result
            });
        }
        else{
            console.log('data not found');
        }
    })
})

//Get data from Equipas
app.get('/lac/equipas',(req, res)=>{
    let qry = `SELECT * FROM equipas order by id`;

    db.query(qry,(err,result)=>{ 
        if(err){
            console.log(err,'erros');
        }
        if(result.length >0){
            res.send({
                message:'equipas get',
                data:result
            })
        }
        else{console.log('data not found');}
    })
})
