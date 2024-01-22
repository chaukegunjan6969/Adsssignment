const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyparser = require('body-parser');


const app = express();





app.use(bodyparser.json());


app.use(cors());
const db =  mysql.createConnection({
    host:"localhost",
    user: 'root',
    password:'2003',
    database:'gunjan'
})

app.get('/', (req,res)=>{
    res.send(`<h1>Gunjan chauke</h1>`)
})

app.get('/user',async (req,res)=>{
    
    const sql = "SELECT * FROM USERS";

    db.query(sql, (err, data)=>{
        
        if(err) return res.json(err);
        return res.json(data);
})
})


// const promisePool = db.promise();



const storeFormData = async (req, res) => {
    try {
        console.log('Received form data:', req.body);

        const { username, password } = req.body;
    
        console.log('Username:', username);
        console.log('Password:', password);
  
      // Validate the data if needed
  
      const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  
      db.query(sql, [username, password], (error, results) => {
        if (error) {
          console.error('Error storing form data:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Respond with a success message or other appropriate response
          res.status(200).json({ message: 'Form data stored successfully', insertedId: results.insertId });
        }
      });
      
    } catch (error) {
      console.error('Error storing form data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  


  app.post('/register', storeFormData);


app.listen(5000, ()=>{
    console.log("app is listening on 5000" );
});




