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
    host: 'localhost',
    user: 'root',
    password: 'Teste123',
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
//Get data from Equipas
app.get('/lac/equipas/jogadores',(req, res)=>{
    let getId= req.params.id;
    let qry = `SELECT * FROM jogadoresEqui where nomeEquipa = '${getId}' `;

    db.query(qry,(err,result)=>{ 
        if(err){
            console.log(err,'erros');
        }
        if(result.length >0){
            res.send({
                message:'All players data',
                data:result
            })
        }
        else{console.log('data not found');}
    })
})
