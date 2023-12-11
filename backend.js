const express = require('express')
var cors = require('cors')
const mysql = require('mysql')
const app = express()

const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.static('Images'))

var connection
function kapcsolat()
{
   connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sztzarodolgozat'
  })
  
  connection.connect()
  
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/uzlet', (req, res) => {
    
kapcsolat()
connection.query('SELECT * FROM uzlet', (err, rows, fields) => {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})
connection.end() 
})

app.get('/termek', (req, res) => {
kapcsolat()
connection.query('SELECT * FROM termek', (err, rows, fields) => {
  if (err) throw err

  console.log(rows)
  res.send(rows)
})
connection.end() 
})

app.get('/kettabla', (req, res) => {
  kapcsolat()

connection.query('SELECT * FROM termek inner join termektipus on termek.termek_tipus_id=termektipus_id', (err, rows, fields) => {
if (err) throw err

console.log(rows)
res.send(rows)
})
connection.end() 
})


app.post('/keresar', (req, res) => {
kapcsolat()

connection.query(`SELECT * FROM termek WHERE termek.termek_ar < ${req.body.bevitel1}`, (err, rows, fields) => {
if (err) {
  console.log("Hiba")
}
else{
  console.log(rows)
  res.send(rows)
}

})
connection.end() 
})

app.post('/keresszoveg', (req, res) => {
kapcsolat()

connection.query(`SELECT * FROM termek WHERE termek.termek_nev like "%${req.body.bevitel1}%"`, (err, rows, fields) => {
if (err) throw err

console.log(rows)
res.send(rows)
})
connection.end() 
})

//Felvitelek----------------------------------------------

app.post('/felviteltipus', (req, res) => {
kapcsolat()

connection.query(`INSERT INTO termektipus VALUES (NULL,"${req.body.bevitel1}")`, (err, rows, fields) => {
if (err){
  console.log("Hiba")
  res.send("Hiba")
}
else{
  console.log("Sikeres felvitel")
  res.send("Sikeres felvitel")
}




})
connection.end() 
})

//Felvitel termek---------------------------------

app.post('/felviteltermek', (req, res) => {
kapcsolat()
  
  connection.query(`INSERT INTO termek VALUES (NULL,"${req.body.bevitel1}",${req.body.bevitel2},${req.body.bevitel3})`, (err, rows, fields) => {
  if (err){
    console.log("Hiba")
    res.send("Hiba")
  }
  else{
    console.log("Sikeres felvitel")
    res.send("Sikeres felvitel")
  }
})
connection.end() 
})

app.get('/uzlettipus', (req, res) => {
  kapcsolat()
  connection.query('SELECT * FROM uzlettipus', (err, rows, fields) => {
    if (err) throw err
  
    console.log(rows)
    res.send(rows)
  })
  connection.end() 
  })
//-----------------------------------------




app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})