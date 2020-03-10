const express = require('express');
const routes = express.Router();

const Pool = require('pg').Pool;
const db = new Pool({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: '5432',
  database: 'eventmanager'
});

routes.get('/events', (req,res) =>{
  db.query("SELECT * FROM events", function(err, result){
    if(err) return res.send("Erro de banco de dados.");

    const events = result.rows;
    return res.json(events);
  });
});

routes.get('/events/:event_id', (req,res) =>{
  const { event_id } = req.params;
  db.query(`SELECT * FROM events WHERE id = ${event_id}`, function(err, result){
    if(err) return res.send("Erro de banco de dados.");

    const event = result.rows;
    return res.json(event);
  });
});

routes.post('/events', async (req,res) =>{
  const { name, location, date, time } = req.body;
  const query = `
    INSERT INTO events ("name","location", "date", "time") 
    VALUES ($1, $2, $3, $4)
  `;
  const values = [name, location, date, time];

  let eventFind={};
  let cont=0;
  await db.query(`SELECT * FROM events`, function(err, result){
    if(err) return res.send("Erro de banco de dados.");
    const events = result.rows;
    for(var event in events){
      if(events[event].name === name){
        cont +=1;
        eventFind=events[event];
      }
    }
    if(cont>0){
      return res.json({message: "O event já existe"});
    }else{
    db.query(query, values, function(err,result){
        if(err) return res.send("Erro no banco de dados.");
      return res.json({message: "Evento Cadastrado"});
    });
    }
  });
});

routes.delete('/events/:event_id', (req,res) =>{
  const { event_id } = req.params;
  db.query(`DELETE FROM events WHERE id = ${event_id}`, function(err, result){
    if(err) return res.send("Erro de banco de dados.");

    return res.json({message: "Evento Deletado"});
  });
});

routes.put('/events/:event_id', (req,res) =>{
  const { name, location, date, time } = req.body;
  const { event_id } = req.params;

  db.query(`UPDATE events SET name = ${name}, location = ${location}, date = ${date}, time = ${time} 
  WHERE id = ${event_id}`, function(err,result){
    if(err) return res.send("Erro no banco de dados.");
  
    // console.log("Entrou")
    return res.json({message: "Evento Alterado"});
  });
});

module.exports = routes;